import type { Request, Response } from "express";

const handleLogout = (req: Request, res: Response) => {
    const { accessToken, refreshToken } = req.cookies;

    if(!accessToken || !refreshToken){
        res.status(400).json({
            message: "Tokens missing"
        })
        return;
    }
    res.status(200).clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    }).clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    }).json({
        message: "Logged out successfully"
    })
}

export default handleLogout;