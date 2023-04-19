import express from "express";
import {
    addEmployee,
    deleteSingleEmployee,
    getAllEmployees,
 getSingleEmployee,
 homeController,
 updateSingleEmployee,
 uploadImage
} from "../controllers/user.controller";
// import { isLoggedIn, customRole } from "../middlewares/auth.middleware";
// import { ADMIN } from "../utils/authRoles";

const router = express.Router();

router.route("/").get(homeController);
router.route("/employees").get(getAllEmployees);
router.route("/employee/add").post(addEmployee);
router.route("/employee/:profileId").get(getSingleEmployee);
router.route("/employee/:profileId").put(updateSingleEmployee);
router.route("/employee/:profileId").delete(deleteSingleEmployee);
router.route("/employee/pic/:profileId").put(uploadImage);




export default router;