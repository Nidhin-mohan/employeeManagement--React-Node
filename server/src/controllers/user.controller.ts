import { Request, Response } from "express";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";
import { sp } from '@pnp/sp-commonjs';




export const homeController = (req: Request, res: Response): void => {

    
    res.status(200).json({
      message: "Welcome to the home page!",
    });
  };


// get all employees from list

export const getAllEmployees = asyncHandler(async (req: Request, res: Response) => {

  const employees = await sp.web.lists.getByTitle("Employees").items.getAll();

  res.status(200).json({
    success: true,
    message: "Fetched all employees from list",
    employees,
  });
});



export const getSingleEmployee = asyncHandler(async (req: Request, res: Response) => {
 
  const { profileId } = req.params;
  console.log(profileId)

  const employee = await sp.web.lists.getByTitle('Employees').items.getById(Number(profileId))();

  res.status(200).json({
    success: true,
    message: "Fetched Single Employee",
    employee,
  });
});

