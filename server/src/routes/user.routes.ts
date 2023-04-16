import express from "express";
import {
 homeController
} from "../controllers/user.controller";
// import { isLoggedIn, customRole } from "../middlewares/auth.middleware";
// import { ADMIN } from "../utils/authRoles";

const router = express.Router();

router.route("/").get(homeController);



export default router;
