import type { Request, Response } from "express";
import { allMessagesModel } from "../Models/AllMessages.model.js";

const getAllChats = async(req: Request, res: Response) => {
    const { chatname } = req.body;
    try {
        const data = await allMessagesModel.find({chatname: chatname});
        if(data.length == 0){
            res.status(200).json({
                message: "No chats found",
                chats: []
            })
            return;
        }
        res.status(200).json({
            message: "Chats found successfully",
            chats: data,
            chatname: chatname
        })
    }
    catch(error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
export default getAllChats;