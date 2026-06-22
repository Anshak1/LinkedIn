import express from "express";
const authRouter = express.Router();

import { register, login, logout, verifyEmail } from "../controllers/auth.controllers.js";

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/verify-email/:verifyToken", verifyEmail);

export default authRouter;