import type { Request, Response } from "express";
import crypto from "crypto";
import pool from "../Utils/PostgresConnection.utils.js";
import redis from "../Utils/RedisConnection.utils.js";
import sendMail from "../Utils/MailSend.utils.js";

const handleSignup = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  var query = `SELECT * FROM usersTalkApp WHERE email = $1`;
  try {
    const response = await pool.query(query, [email]);
    if ((response.rowCount ?? 0) > 0) {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }
    
    const otp = crypto.randomInt(100000, 999999).toString();
    await redis.set(`otp_${email}`, otp, 'EX', 300);
    await redis.set(`userDetails_${email}`, JSON.stringify({name: name, password: password, email: email}), 'EX', 400);

    const mail = await sendMail(email, 'TalkApp - Verify your email', `<h1>Your OTP is ${otp}. It is valid for 5 minutes.</h1>`)
    if(mail) {
      res.status(200).json({
        message: "OTP sent successfully"
      })
    }

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default handleSignup;
