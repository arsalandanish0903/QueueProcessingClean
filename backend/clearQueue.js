import { Queue } from "bullmq";
import { redisConnection } from "./config/redis.js";

const queue = new Queue("job-import-queue", {
  connection: redisConnection
});

await queue.obliterate({ force: true });
console.log("Queue cleared successfully");
process.exit(0);
