import { Router } from "express";
import handleSignup from "../Auth/Signup.controller.js";
import handleLogin from "../Auth/login.controller.js";
import handleLogout from "../Auth/logout.controller.js";
import handleOTP from "../Auth/HandleOTP.controller.js";
import handleResendOTP from "../Auth/HandleResendOTP.controller.js";
import checkLogin from "../Auth/CheckLogin.controller.js";
import checkRefreshToken from "../Auth/checkRefreshToken.controller.js";

const router = Router();

router.route("/signup").post(handleSignup);
router.route("/login").post(handleLogin);
router.route("/logout").get(handleLogout);
router.route("/handleOTP").post(handleOTP);
router.route("/resendOTP").post(handleResendOTP);
router.route("/checkLogin").get(checkLogin);
router.route('/authRefreshToken').post(checkRefreshToken);

export default router;