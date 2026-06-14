import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("Token from cookies:", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //console.log("verifyToken:", verifyToken);
    req.userId = verifyToken.id;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isAuth;