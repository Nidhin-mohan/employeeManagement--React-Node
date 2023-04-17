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


//get single user by id
export const getSingleEmployee = asyncHandler(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  console.log(profileId)

  const id = Number(profileId);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: 'Invalid ID provided'
    });
    return;
  }

  const employee = await sp.web.lists.getByTitle('Employees').items.getById(id)();

  res.status(200).json({
    success: true,
    message: "Fetched Single Employee",
    employee,
  });
});




//delete single user by id  
export const deleteSingleEmployee = asyncHandler(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  console.log(profileId)

  const id = Number(profileId);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: 'Invalid ID provided'
    });
    return;
  }

  const employee =  await sp.web.lists.getByTitle('Employees').items.getById(id).delete();

  res.status(200).json({
    success: true,
    message: "User Deleted succesfullly",
    
  });
});
