import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../Utils/PostgresConnection.utils.js";
import config from "../config.js";

const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email or password missing",
      });
      return;
    }

    var query = `SELECT * FROM usersTalkApp WHERE email = $1`;

    const response = await pool.query(query, [email]);
    if (response.rowCount == 0) {
      res.status(400).json({
        message: "Please sign up first",
      });
      return;
    } else if (response.rows[0].password !== password) {
      res.status(400).json({
        message: "Incorrect password",
      });
      return;
    }
    const accessToken = jwt.sign(
      {
        email: email,
        message: "This is the access token",
      },
      config.ACCESS_TOKEN_SECRET || "",
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      {
        email: email,
        message: "This is the refresh token",
      },
      config.REFRESH_TOKEN_SECRET || "",
      {
        expiresIn: "1d",
      }
    );

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: "Login successful",
      });
  } 
  catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export default handleLogin;
