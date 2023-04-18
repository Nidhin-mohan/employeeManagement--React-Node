import express from "express";
import {
    deleteSingleEmployee,
    getAllEmployees,
 getSingleEmployee,
 homeController,
 updateSingleEmployee
} from "../controllers/user.controller";
// import { isLoggedIn, customRole } from "../middlewares/auth.middleware";
// import { ADMIN } from "../utils/authRoles";

const router = express.Router();

router.route("/").get(homeController);
router.route("/employees").get(getAllEmployees);
router.route("/employee/:profileId").get(getSingleEmployee);
router.route("/employee/:profileId").put(updateSingleEmployee);
router.route("/employee/:profileId").delete(deleteSingleEmployee);




export default router;