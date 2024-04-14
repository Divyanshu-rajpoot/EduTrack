import { Router } from "express";
import { infoabout, infologin , infohome } from "../controllers/maincontroller.js";
const router = Router();
router.get("/", infohome);
// router.get("/about", infoabout);
router.get("/analytics",);
router.get("/login",infologin );

export default router;