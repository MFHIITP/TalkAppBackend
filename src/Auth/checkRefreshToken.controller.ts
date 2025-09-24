import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config.js";

const checkRefreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    const decode = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET ?? "");
    const email = decode.email;
    const accessToken = jwt.sign(
      {
        email: email,
        message: "This is the Access Token",
      },
      config.ACCESS_TOKEN_SECRET ?? "",
      {
        expiresIn: "1h",
      }
    );
    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: "AccessToken Generated",
      });
  } catch (error) {
    res
      .status(419)
      .clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: "Refresh Token Expired",
      });
  }
};
export default checkRefreshToken;
