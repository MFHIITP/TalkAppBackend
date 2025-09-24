import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import config from "../config.js";

const checkLogin = async(req: Request, res: Response) => {
    try{
        const {accessToken, refreshToken} = req.cookies;
        if(accessToken && refreshToken){
            try {
                const decode = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET ?? "");
                res.status(200).json({
                    login: true
                });
                return;
            }
            catch(error){
                res.status(401).json({
                    message: "Access Token Expired" 
                })
                return;
            }
        }
        res.status(200).json({
            login: false
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export default checkLogin;