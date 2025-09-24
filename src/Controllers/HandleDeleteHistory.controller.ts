import type { Request, Response } from "express";
import pool from "../Utils/PostgresConnection.utils.js";
import { allMessagesModel } from "../Models/AllMessages.model.js";

const handleDeleteHistory = async(req: Request, res: Response) => {
    const email = req.body.email;
    const chatname = req.body.chatname

    if(!email){
        res.status(400).json({
            message: "Email missing"
        })
        return;
    }
    const query = `DELETE FROM emailChatMap WHERE email = $1 AND chatname = $2`;
    try {
        const response = await pool.query(query, [email, chatname]);
        const deletedMessages = await allMessagesModel.deleteMany({chatname: chatname});
        res.status(200).json({
            message: "History deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
export default handleDeleteHistory;