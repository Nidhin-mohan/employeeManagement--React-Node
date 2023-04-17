import express from "express";
import {
    getAllEmployees,
 homeController
} from "../controllers/user.controller";
// import { isLoggedIn, customRole } from "../middlewares/auth.middleware";
// import { ADMIN } from "../utils/authRoles";

const router = express.Router();

router.route("/").get(homeController);
router.route("/employees").get(getAllEmployees);




export default router;
