import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  console.log("data from req.body :", req.body);
  const { userName, password } = req.body;

  if (!userName || !password) {
    return next(
      errorHandler(
        400,
        "Empty fields. All fields are required. Please fill in all fields."
      )
    );
  }

  if (userName.length > 20) {
    return next(
      errorHandler(
        400,
        "Username exceeds the maximum character limit of 20 characters."
      )
    );
  }
  if (userName.length < 3) {
    return next(
      errorHandler(
        400,
        "Username must be at least 3 characters long. Please try again."
      )
    );
  }

  if (password.length < 6) {
    return next(
      errorHandler(
        400,
        "Password must be at least 6 characters long. Please try again."
      )
    );
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

export const logIn = async (req, res, next) => {
  const { userName, password } = req.body;
  console.log("data from req.body", req.body);

  if (!userName || !password) {
    next(errorHandler(400, "Empty fields. All fields are required"));
    return;
  }

  try {
    const validUser = await User.findOne({ userName });
    if (!validUser) {
      next(errorHandler(404, "user name not found"));
      return;
    }

    const validPassword = await argon2.verify(validUser.password, password);
    if (!validPassword) {
      next(errorHandler(400, "incorrect password"));
      return;
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "360d",
      }
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "logged in successfully",
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};
