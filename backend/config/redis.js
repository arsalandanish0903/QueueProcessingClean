import dotenv from "dotenv";
dotenv.config();
import IORedis from "ioredis";

export const redisConnection = new IORedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,

    maxRetriesPerRequest: null,
    enableReadyCheck: false
});

redisConnection.on("connect", () => {
    console.log("Redis connected successfully");
});

redisConnection.on("error", (err) => {
    console.error("Redis error", err);
});
