import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  externalId: { type: String, index: true },
  title: String,
  company: String,
  location: String,
  url: String,
  source: String,
  raw: {
    type: String
  }
}, { timestamps: true });

jobSchema.index({ externalId: 1, source: 1 }, { unique: true });

export default mongoose.model("Job", jobSchema);
