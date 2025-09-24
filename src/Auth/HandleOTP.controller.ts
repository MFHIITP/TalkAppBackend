import type { Request, Response } from "express";
import redis from "../Utils/RedisConnection.utils.js";
import pool from "../Utils/PostgresConnection.utils.js";

const handleOTP = async(req: Request, res: Response) => {
    const { email, otp } = req.body;

    if(!email || !otp){
        res.status(400).json({
            message: 'Email or OTP missing'
        })
        return;
    }

    const storedOTP = await redis.get(`otp_${email}`);
    if(!storedOTP){
        res.status(400).json({
            message: 'OTP Expired'
        })
        return;
    }
    else if(storedOTP !== otp){
        res.status(400).json({
            message: 'Invalid OTP'
        })
        return;
    }

    const userDetailsString = await redis.get(`userDetails_${email}`);
    if(!userDetailsString){
        res.status(400).json({
            message: "User Details Expired"
        })
        return;
    }

    const userDetails = JSON.parse(userDetailsString);

    const {name, password} = userDetails;

    if(!name || !password){
        res.status(400).json({
            message: "User Details Incomplete"
        })
        return;
    }

    await redis.del(`otp_${email}`);
    await redis.del(`userDetails_${email}`);

    var query = `INSERT INTO usersTalkApp (email, name, password) VALUES ($1, $2, $3)`;
    try {
        const response = await pool.query(query, [email, name, password]);
        res.status(200).json({
            message: "User registered successfully"
        })
    } 
    catch(error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
    
}
export default handleOTP;