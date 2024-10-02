import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
  console.log("data from req.body :", req.body);
  const { userName, password } = req.body;

  if (!userName || !password) {
    next(
      errorHandler(
        400,
        "Empty fields. All fields are required. Please fill in all fields."
      )
    );
    return;
  }
  try {
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      userName,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password: pass, ...rest } = savedUser._doc;

    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "360d" }
    );
    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "You signed up successfully",
        user: rest,
      });
  } catch (error) {
    next(error);
    return;
  }
};
