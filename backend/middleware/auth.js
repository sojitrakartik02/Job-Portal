import { User } from "../Models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./middlew.js";
import jwt from "jsonwebtoken";
export const isAuth = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authentication", 400));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decode.id);
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to acces this resource`,
          400
        )
      );
    }
    next();
  };
};
