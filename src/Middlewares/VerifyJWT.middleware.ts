import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config.js';

const checkAccessToken = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
        if(!accessToken && !refreshToken) {
            res.status(400).json({
                message: 'Not Logged In'
            })
            return;
        }
        const verify = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET || "");
        if(!verify) {
            res.status(401).json({
                message: "Invalid Access Token"
            })  
            return;
        }
        next();
    }
    catch(error) {
        res.status(401).json({
            message: 'Access Token Expired'
        })
    }
}

export default checkAccessToken;