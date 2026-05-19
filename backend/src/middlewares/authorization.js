import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = (req, res, next) => {
  try {
    // get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.SECRETPIN);

    // attach user data
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};
// admin pass
export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    // check role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

