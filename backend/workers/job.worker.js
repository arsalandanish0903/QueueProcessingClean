import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import Job from "../model/job.model.js";
import ImportLog from "../model/ImportLog.model.js";

console.log("Worker booted and waiting for jobs");

// Step 1: Extract safe text from XML-parsed values
const getText = (value) => {
  if (!value) return null;

  if (typeof value === "string") return value;

  if (typeof value === "object") {
    if (value._) return value._;
    if (value["#text"]) return value["#text"];

    return JSON.stringify(value);
  }

  return String(value);
};

// Step 2: Sanitize raw job payload
// Store raw payload safely
// MongoDB does NOT allow `$` keys
const sanitizeRawJob = (jobData) => {
  try {
    return JSON.stringify(jobData);
  } catch {
    return null;
  }
};


// Step 3: Initialize BullMQ worker for job import queue
new Worker(
  "job-import-queue",
  async (job) => {
    const { job: jobData, source, logId } = job.data;

    console.log("Processing job:", getText(jobData?.title));

    try {
      // Step 4: Generate external ID for deduplication
      const externalId = getText(jobData.guid) || getText(jobData.link);

      if (!externalId) {
        throw new Error("External ID missing");
      }

      // Step 5: Prepare normalized job fields
      const title = getText(jobData.title);
      const company = getText(jobData["dc:creator"]) || "Unknown";
      const location = getText(jobData.location) || "Remote";
      const url = getText(jobData.link);
      const raw = sanitizeRawJob(jobData);

      // Step 6: Upsert job into MongoDB
      const result = await Job.findOneAndUpdate(
        { externalId, source },
        {
          title,
          company,
          location,
          url,
          source,
          raw
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        }
      );

      // Step 7: Update import log counts
      const log = await ImportLog.findById(logId);
      if (!log) {
        console.warn("ImportLog not found for:", externalId);
        return;
      }

      if (result.createdAt.getTime() === result.updatedAt.getTime()) {
        log.newJobs += 1;
        console.log("New job inserted:", title);
      } else {
        log.updatedJobs += 1;
        console.log("Job updated:", title);
      }

      await log.save();

      console.log("Job processed successfully:", title);
    } catch (error) {
      console.error(
        "Job failed:",
        getText(jobData?.title),
        error.message
      );

      // Step 8: Track failed jobs in import log
      const log = await ImportLog.findById(logId);
      if (log) {
        log.failedJobs += 1;
        log.failures.push({
          externalId:
            getText(jobData?.guid) ||
            getText(jobData?.link) ||
            "unknown",
          reason: error.message
        });
        await log.save();
      }

      // Step 9: Throw error to allow BullMQ retry mechanism
      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: Number(process.env.QUEUE_CONCURRENCY) || 10
  }
);
