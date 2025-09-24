import type { Request, Response } from "express";
import pool from "../Utils/PostgresConnection.utils.js";
import { allMessagesModel } from "../Models/AllMessages.model.js";

const handleClearHistory = async(req: Request, res: Response) => {
    const email = req.body.email;

    if(!email){
        res.status(400).json({
            message: "Email missing"
        })
        return;
    }

    const query = `SELECT chatname FROM emailChatMap WHERE email = $1 ORDER BY id DESC`;
    try{ 
        const response = await pool.query(query, [email]);
        response.rows.forEach(async(val) => await allMessagesModel.deleteMany({chatname: val.chatname}))
        const deleteQuery = `DELETE FROM emailChatMap WHERE email = $1`;
        const deleteResponse = await pool.query(deleteQuery, [email]);
        res.status(200).json({
            message: "History cleared successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
export default handleClearHistory;
