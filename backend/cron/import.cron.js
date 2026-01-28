import cron from "node-cron";
import { fetchJobsFromAPI } from "../services/fetchJobs.service.js";
import { jobQueue } from "../queues/job.queue.js";
import ImportLog from "../model/ImportLog.model.js";

// Step 1: List of external job feed APIs
const JOB_APIS = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  "https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france",
  "https://jobicy.com/?feed=job_feed&job_categories=design-multimedia",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
  "https://jobicy.com/?feed=job_feed&job_categories=copywriting",
  "https://jobicy.com/?feed=job_feed&job_categories=business",
  "https://jobicy.com/?feed=job_feed&job_categories=management",
  "https://www.higheredjobs.com/rss/articleFeed.cfm"
];

// Step 2: Run cron job every hour
cron.schedule("0 * * * *", async () => {
  console.log("Cron started");

  // Step 3: Loop through each job feed API
  for (const api of JOB_APIS) {

    // Step 4: Create import log entry for this feed

    const log = await ImportLog.create({
      fileName: api,
      timestamp: new Date(),
      totalFetched: 0,
      newJobs: 0,
      updatedJobs: 0,
      failedJobs: 0,
      failures: []
    });

    // Step 5: Fetch jobs from external API
    const data = await fetchJobsFromAPI(api);

    // Step 6: Normalize RSS items to always get an array
    const rawItems = data?.rss?.channel?.item;
    const jobs = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

    // Step 7: Update total fetched job count
    log.totalFetched = jobs.length;
    await log.save();

    // Step 8: Push each job into Redis queue for background processing
    for (const job of jobs) {
      await jobQueue.add("import-job", {
        job,
        source: api,
        logId: log._id
      });
      console.log("Job added to queue:", job.title);
    }

  }
});
