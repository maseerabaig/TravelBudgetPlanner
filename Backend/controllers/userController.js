import argon2 from "argon2";
import { userModel } from "../models/usermodels.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { OTP } from "../models/otpModel.js";

// signup controller

const signup = async (req, res) => {
  const { name, username, email, password } = req.body;

  // Validate input
  if (!name || !username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if email or username already exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(409).json({ msg: "Email or Username already in use" });
    }

    // Hash the password
    const hash = await argon2.hash(password);

    // Create the user
    const payload = {
      name,
      username,
      email,
      password: hash,
    };
    const createData = await userModel.create(payload);

    // Respond with success
    res.status(201).json({
      msg: "Your Account Created Successfully",
      payload: createData,
    });
  } catch (error) {
    // Error handling
    console.error("Error in signup:", error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// sigin controller

const signin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and Password are required" });
  }

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Verify the password
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Respond with success (You can generate a token here for JWT auth)

    // Access Token
    const AccessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    // refesh Token

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_REFRESH_SECRET
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      msg: "Signin successful",
      AccessToken: AccessToken,
      refreshToken: refreshToken,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // Error handling
    console.error("Error in signin:", error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// forget password

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.SENDER_MAIL_EMAIL,
    pass: process.env.SENDER_MAIL_PASSWORD,
  },
});

const forgotpassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await transporter.sendMail({
      to: email,
      from: "hannah4@ethereal.email",
      subject: "Reset Password otp",
      html: `<h1>reset password </h1>  Your OTP for password reset is: ${otp}. It is valid for 10 minutes. `,
    });

    await OTP.insertMany([
      {
        email,
        otp,
      },
    ]);

    res.json({
      msg: "OTP send to your email succesfully",
    });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const resetpassword = async (req, res) => {
  const { otp, email, password } = req.body;
  console.log(email, password);
  // Validate input
  if (!otp) {
    return res.status(400).json({ msg: "otp required" });
  }
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and Password are required" });
  }

  try {
    const otpModel = await OTP.findOne({ email });

    if (!otpModel || otpModel.otp !== otp) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }
    const hashpassword = await argon2.hash(password);

    const result = await userModel.updateOne(
      { email },
      { $set: { password: hashpassword } }
    );
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ msg: "User not found or password unchanged" });
    }

    await OTP.deleteOne({ email });

    res.status(200).json({ message: "New password created" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export { signup, signin, forgotpassword, resetpassword };
