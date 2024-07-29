import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/middlew.js";
import { User } from "../Models/userSchema.js";
import { Job } from "../Models/jobSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const postJob = catchAsyncError(async (req, res, next) => {
  const {
    title,
    jobType,
    location,
    companyName,
    qualifications,
    responsibilities,
    introduction,
    offers,
    salary,
    hiringMultiEmp,
    personalWebsiteUrl,
    personalWebsiteTitle,
    jobNiche,
  } = req.body;

  if (
    !title ||
    !jobType ||
    !companyName ||
    !introduction ||
    !salary ||
    !responsibilities ||
    !location ||
    !qualifications ||
    !jobNiche
  ) {
    return next(new ErrorHandler("Please Provide Full job Details", 400));
  }

  if (
    (personalWebsiteTitle && !personalWebsiteUrl) ||
    (!personalWebsiteTitle && personalWebsiteUrl)
  ) {
    return next(
      new ErrorHandler(
        "Please Provide both the website url and title, or leave blank",
        400
      )
    );
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    jobType,
    location,
    companyName,
    qualifications,
    responsibilities,
    introduction,
    offers,
    salary,
    hiringMultiEmp,
    personalWebsite: {
      title: personalWebsiteTitle,
      url: personalWebsiteUrl,
    },
    jobNiche,
    postedBy,
  });

  res.status(201).json({
    success: true,
    message: "Job Posted",
  });
});

export const getAllJob = catchAsyncError(async (req, res, next) => {
  const { city, niches, searchKeyword } = req.query;
  const query = {};
  if (city) {
    query.location = city;
  }

  if (niches) {
    query.jobNiche = niches;
  }
  if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { introduction: { $regex: searchKeyword, $options: "i" } },
      { companyName: { $regex: searchKeyword, $options: "i" } },
    ];
  }
  const jobs = await Job.find(query);
  res.status(200).json({
    success: true,
    jobs,
    count: jobs.length,
  });
});

export const getMyJob = catchAsyncError(async (req, res, next) => {
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});
export const deletejob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    return next(new ErrorHandler("Job Not found", 400));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted",
  });
});
export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job Not found", 400));
  }
  res.status(200).json({
    success: true,
    job,
  });
});
