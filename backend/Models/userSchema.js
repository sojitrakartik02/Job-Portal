import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 char."],
    maxLength: [30, "Name cannot exceed 30 char."],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  niches: { firstNiche: String, secondNiche: String, thirdNiche: String },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain at least 8 char."],
    maxLength: [32, "Password cannot exceed 32 char."],
    select: false,
  },
  resume: { url: String, public_id: String },
  role: { type: String, required: true, enum: ["Job Seeker", "Employer"] },
  coverLetter: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
export const User = mongoose.model("User", userSchema);
