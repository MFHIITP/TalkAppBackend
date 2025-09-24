import type { Request, Response } from "express";
import redis from "../Utils/RedisConnection.utils.js";
import sendMail from "../Utils/MailSend.utils.js";

const handleResendOTP = async(req: Request, res: Response) => {
    const {email} = req.body;
    try{
        const otp = await redis.get(`otp_${email}`)
        const details = await redis.get(`userDetails_${email}`)
        if(!otp){
            res.status(400).json({
                message: "OTP Expired"
            })
            return;
        }
        if(!details){
            res.status(405).json({
                message: "Please Sign Up Again"
            })
            return;
        }
        const mail = await sendMail(email, 'TalkApp - Verify your email', `<h1>Your OTP is ${otp}. It is valid for 5 minutes.</h1>`);
        if(!mail){
            throw new Error;
        }
        
        res.status(200).json({
            message: "OTP Resend Successfully"
        })

        await redis.set(`otp_${email}`, otp, 'EX', 300);
        await redis.set(`userDetails_${email}`, details, 'EX', 400);

    }
    catch(error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export default handleResendOTP;