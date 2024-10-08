import jwt from "jsonwebtoken";
import { errorUtil } from "./errorUtil.js";

export const verifyUserUtil = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorUtil(401, "Unauthorized access"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorUtil(401, "Unauthorized access"));
    }

    req.user = user;

    next();
  });
};
