import { Router } from "express";
import { infoabout, infologin , infohome ,register,error,analytics } from "../controllers/maincontroller.js";
import { Allcourses } from "../controllers/courses.controller.js";
import { Allsales } from "../controllers/sales.controller.js";
const router = Router();
router.get("/", infohome);
router.get("/about", infoabout);
router.get("/analytics", analytics);
router.get("/login",infologin );
router.get("/register",register);
router.get("/courses", Allcourses);
router.get("/sales", Allsales)

router.get("*" , error);

export default router;