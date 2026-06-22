import express from "express";
const authRouter = express.Router();

import * as authController from "../controllers/auth.controllers.js";
import isAuth from "../middlewares/isAuth.js";

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/forget-password", authController.forgetPassword);
// alias for client: 'forgot-password' route
authRouter.post("/forgot-password", authController.forgetPassword);
authRouter.post("/reset-password/:resetToken", authController.resetPassword);
authRouter.get("/verify-email/:verifyToken", authController.verifyEmail);
authRouter.post('/google', authController.googleLogin)
authRouter.get('/getMe', isAuth, authController.getMe)

export default authRouter;