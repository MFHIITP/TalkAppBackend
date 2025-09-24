import type { Request, Response } from "express";
import pool from "../Utils/PostgresConnection.utils.js";
import { allMessagesModel } from "../Models/AllMessages.model.js";

const handleAddHistory = async(req: Request, res: Response) => {
    const { email, messages, chatname } = req.body;
    
    if(!email){
        res.status(400).json({
            message: "Email missing"
        })
        return;
    }
    if(!chatname){
        res.status(400).json({
            message: "ChatName is required"
        })
        return;
    }

    const checkQuery = `SELECT COUNT(*) AS cnt FROM emailChatMap WHERE chatname = $1`;

    const query = `INSERT INTO emailChatMap (email, chatname) VALUES ($1, $2)`;
    try {
        const checkResponse = await pool.query(checkQuery, [chatname]);
        if(parseInt(checkResponse.rows[0].cnt, 10) > 0){
            res.status(400).json({
                message: "Chatname already exists"
            })
            return;
        }
        const response = await pool.query(query, [email, chatname]);
        if(response.rowCount === 0){
            throw new Error;
        }
        const allMessages = messages.map((val: {query: string, response: string}, key: number) => ({
            chatname: chatname,
            query: val.query,
            response: val.response
        }))
        const result = await allMessagesModel.insertMany(allMessages);
        res.status(200).json({
            message: "Message added successfully"
        })
    }
    catch(error) {
        const query =  `DELETE FROM emailChatMap WHERE email = $1`;
        const response = await pool.query(query, [email]);
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export default handleAddHistory;