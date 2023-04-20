import express from "express";
import {
    addEmployee,
    deleteSingleEmployee,
    
    getAllEmployees,
    getSingleEmployee,
    updateSingleEmployee,
    uploadDocument,
    uploadImage
} from "../controllers/user.controller";

const router = express.Router();

router.route("/employees").get(getAllEmployees);
router.route("/employee/add").post(addEmployee);
router.route("/employee/:profileId").get(getSingleEmployee);
router.route("/employee/:profileId").put(updateSingleEmployee);
router.route("/employee/:profileId").delete(deleteSingleEmployee);
router.route("/employee/pic/:profileId").put(uploadImage);
router.route("/employee/document/:profileId").put(uploadDocument);






export default router;