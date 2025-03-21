import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  email: String,
  otp: String,
  createAt:Date
});

const OTP = model("otp", otpSchema);

export { OTP };
