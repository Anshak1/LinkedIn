import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req, res, next) => {
  try {
    // Try cookie first, then Authorization header (Bearer token)
    let token = req.cookies?.token;
    if (!token) {
      const authHeader = req.headers?.authorization || req.headers?.Authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET); // decoded token
    if (!verifyToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = verifyToken.id;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isAuth;