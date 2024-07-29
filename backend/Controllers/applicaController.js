import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/middlew.js";
import { Application } from "../Models/AplliSchmea.js";
import { Job } from "../Models/jobSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const postAppli = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, coverLetter, address } = req.body;

  console.log("Request Body:", req.body);
  if (!name || !email || !phone || !coverLetter || !address) {
    return next(new ErrorHandler("All field required", 400));
  }

  const jobSeekerInfo = {
    id: req.user._id,
    name,
    email,
    phone,
    address,
    coverLetter,
    role: "Job Seeker",
  };
  const jobDetalis = await Job.findById(id);
  if (!jobDetalis) {
    return next(new ErrorHandler("Job not found", 400));
  }

  const isAlreadyApplid = await Application.findOne({
    "jobInfo.jobId": id,
    "jobSeekerInfo.id": req.user._id,
  });

  if (isAlreadyApplid) {
    return next(new ErrorHandler("You have already applied for this job", 400));
  }
  console.log("Job ID:", id);
  console.log("User ID:", req.user._id);
  console.log("Is Already Applied:", isAlreadyApplid);

  if (req.files && req.files.resume) {
    const { resume } = req.files;
    try {
      const cloudinaryRepo = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {
          folder: "JOB_SEEKER_RESUME",
        }
      );
      if (!cloudinaryRepo || cloudinaryRepo.error) {
        return next(new ErrorHandler("Falid to upload resume", 400));
      }
      jobSeekerInfo.resume = {
        public_id: cloudinaryRepo.public_id,
        url: cloudinaryRepo.secure_url,
      };
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Falid to upload resume", 500));
    }
  } else {
    if (req.user && !req.user.resume.url) {
      return next(new ErrorHandler("Please Upload your Resume", 400));
    }
    jobSeekerInfo.resume = {
      public_id: req.user && req.user.resume.public_id,
      url: req.user && req.user.resume.url,
    };
  }

  const employerInfo = {
    id: jobDetalis.postedBy,
    role: "Employer",
  };

  const jobInfo = {
    jobId: id,
    jobTitle: jobDetalis.title,
  };

  const application = await Application.create({
    jobInfo,
    jobSeekerInfo,
    employerInfo,
  });
  res.status(200).json({
    success: true,
    application,
    message: "Applicaiton Submited",
  });
});
export const emploeyrGetAllAppli = catchAsyncError(async (req, res, next) => {
  const { _id } = req.user;
  const applications = await Application.find({
    "employerInfo.id": _id,
    "deletedBy.employer": false,
  });
  res.status(200).json({
    success: true,
    applications,
  });
});
export const jobSeekerGetAllAppli = catchAsyncError(async (req, res, next) => {
  const { _id } = req.user;
  const applications = await Application.find({
    "jobSeekerInfo.id": _id,
    "deletedBy.jobSeeker": false,
  });
  res.status(200).json({
    success: true,
    applications,
  });
});
export const deleteAppli = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Applicarion not found ", 400));
  }
  const { role } = req.user;
  switch (role) {
    case "Job Seeker":
      application.deletedBy.jobSeeker = true;
      await application.save();
      break;

    case "Employer":
      application.deletedBy.employer = true;
      await application.save();
      break;

    default:
      console.log("Default case for applicaiton deletion");
      break;
  }

  if (
    application.deletedBy.employer === true &&
    application.deletedBy.jobSeeker === true
  ) {
    await Application.deleteOne();
  }
  res.status(200).json({
    success: true,
    message: "Applicaiotn Deleted",
  });
});
