import mongoose from "mongoose";

const importLogSchema = new mongoose.Schema({
  fileName: String,
  timestamp: Date,
  totalFetched: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Number,
  failures: [
    {
      externalId: String,
      reason: String
    }
  ]
});

export default mongoose.model("ImportLog", importLogSchema);
