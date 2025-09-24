import { Router } from "express";
import handleGetHistory from "../Controllers/HandleGetHistory.controller.js";
import handleDeleteHistory from "../Controllers/HandleDeleteHistory.controller.js";
import handleClearHistory from "../Controllers/handleClearHistory.controller.js";
import handleAddHistory from "../Controllers/HandleAddHistory.controller.js";

const router = Router();

router.route("/getHistory/:email").get(handleGetHistory);
router.route("/deleteHistory").post(handleDeleteHistory);
router.route("/clearHistory").post(handleClearHistory);
router.route("/addHistory").post(handleAddHistory);

export default router;