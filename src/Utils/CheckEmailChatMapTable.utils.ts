import type { NextFunction, Request, Response } from "express";
import checkTableExists from "./CheckTableExists.js"

const checkEmailMapTable = async(req: Request, res: Response, next: NextFunction) => {
    if(!(await checkTableExists("emailChatMap"))){
        await import ("../PostgresModels/CreateEmailChatMap.postgresmodel.js");
    }
    next();
}
export default checkEmailMapTable