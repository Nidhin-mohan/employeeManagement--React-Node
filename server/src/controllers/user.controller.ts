import { Request, Response } from "express";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";




export const homeController = (req: Request, res: Response): void => {

    
    res.status(200).json({
      message: "Welcome to the home page!",
    });
  };