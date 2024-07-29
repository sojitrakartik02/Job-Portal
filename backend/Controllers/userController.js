import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/middlew.js";
import { User } from "../Models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";
export const register = catchAsyncError(async (req, res, next) => {
  console.log("Request Body:", req.body);

  const {
    email,
    name,
    phone,
    address,
    role,
    firstNiche,
    secondNiche,
    thirdNiche,
    password,
    coverLetter,
  } = req.body;

  if (!email || !name || !phone || !address || !role || !password) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Email is already registered", 400));
  }

  const userData = {
    email,
    name,
    phone,
    address,
    role,
    niches: { firstNiche, secondNiche, thirdNiche },
    password,
    coverLetter,
  };

  if (req.files && req.files.resume) {
    const { resume } = req.files;
    if (resume) {
      try {
        const cloudinaryRespo = await cloudinary.uploader.upload(
          resume.tempFilePath,
          { folder: "JOB_SEEKER_RESUME" }
        );
        console.log("Cloudinary Response:", cloudinaryRespo);

        if (!cloudinaryRespo || cloudinaryRespo.error) {
          return next(new ErrorHandler("Failed to upload resume", 500));
        }

        userData.resume = {
          public_id: cloudinaryRespo.public_id,
          url: cloudinaryRespo.secure_url,
        };
      } catch (error) {
        return next(new ErrorHandler("Failed to upload resume", 500));
      }
    }
  }

  try {
    const user = await User.create(userData);
    sendToken(user, 201, res, "ueser Registre");
  } catch (error) {
    next(error);
  }
});
export const login = catchAsyncError(async (req, res, next) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  console.log("User found:", user);

  if (!user) {
    return next(new ErrorHandler("Invalid Email", 400));
  }

  const isPasswordCorrect = await user.comparePassword(password);
  console.log("Password correct:", isPasswordCorrect);

  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Password is Incorrect", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("Invalid user role", 400));
  }

  sendToken(user, 200, res, "User Login");
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout",
    });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      coverLetter: req.body.coverLetter,
      niches: {
        firstNiche: req.body.firstNiche,
        secondNiche: req.body.secondNiche,
        thirdNiche: req.body.thirdNiche,
      },
    };
    const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;
    if (
      req.user.role === "Job Seeker" &&
      (!firstNiche || !secondNiche || !thirdNiche)
    ) {
      return next(new ErrorHandler("Please select at least 3 niches", 400));
    }
    if (req.files) {
      const resume = req.files.resume;
      if (resume) {
        const currentResumeId = req.user.public_id;
        if (currentResumeId) {
          await cloudinary.uploader.destroy(currentResumeId);
        }
        const newResume = await cloudinary.uploader.upload(
          resume.tempFilePath,
          {
            folder: "JOB_SEEKER_RESUME",
          }
        );
        newUserData.resume = {
          public_id: newResume.public_id,
          url: newResume.secure_url,
        };
      }
    }
    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      user,
      message: "Profile Upload",
    });
  } catch (error) {
    console.log(error);
  }
});
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("Please provide all the fields", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler("New password and confirm password do not match", 400)
    );
  }

  user.password = newPassword;
  await user.save();

  sendToken(user, 200, res, "Password updated successfully");
});
