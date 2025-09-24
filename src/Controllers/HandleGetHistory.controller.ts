import type { Request, Response } from "express";
import pool from "../Utils/PostgresConnection.utils.js";

const handleGetHistory = async(req: Request, res: Response) => {
    const email = req.params.email;

    if(!email) {
        res.status(400).json({
            message: "Email missing"
        })
        return;
    }
    const query = `SELECT chatname FROM emailChatMap WHERE email = $1 ORDER BY id DESC`;
    try {
        const response = await pool.query(query, [email]);
        if(response.rowCount == 0){
            res.status(200).json({
                message: "No history found",
                history: []
            })
            return;
        }
        res.status(200).json({
            message: "History fetched successfully",
            history: response.rows
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}
export default handleGetHistory;