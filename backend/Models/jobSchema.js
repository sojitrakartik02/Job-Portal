import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  offers: {
    type: String,
  },
  qualifications: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  hiringMultiEmp: {
    type: String,
    default: "No",
    enum: ["Yes", "No"],
  },
  personalWebsite: {
    title: String,
    url: String,
  },
  jobNiche: {
    type: String,
    required: true,
  },
  newsLeterSent: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
