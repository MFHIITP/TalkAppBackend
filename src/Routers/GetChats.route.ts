import { Router } from "express";
import getAllChats from "../Controllers/GetAllChats.controller.js";

const router = Router();

router.route("/getChats").post(getAllChats);

export default router;