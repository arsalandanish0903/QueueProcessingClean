import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const jobQueue = new Queue("job-import-queue", {
  connection: redisConnection
});
