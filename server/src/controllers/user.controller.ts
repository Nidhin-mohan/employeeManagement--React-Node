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



//Add new Employee
export const addEmployee = asyncHandler(async (req: Request, res: Response) => {
  
  const { name, email, designation, phone_number,city, gender, date_of_birth } = req.body;
  
if(!name || !email || !designation || !phone_number || !city || !gender || !date_of_birth ) {
  console.log(`name ${name} email ${email}  designation ${designation} phoneNumber ${phone_number}  ${city}
  ${gender}  ${date_of_birth} `)
  throw new CustomError("Enter all fields", 400);
}
  
  const newEmployee = {
    name: name,
    email: email,
    designation: designation,
    gender: gender,
    phone_number: phone_number,
    city: city,
    date_of_birth: date_of_birth
  };


  const employee = await sp.web.lists.getByTitle('Employees').items.add(newEmployee);


  console.log(employee.data.Id)
  const folderName = employee.data.Id
//adding new folder
const documentLibraryName = "EmployeeLibrary";
const newFolderName =  `${folderName}`;
const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
documentLibrary.rootFolder.folders.addUsingPath(newFolderName)
.then(() => {
console.log(`Folder '${newFolderName}' created successfully.`);
})
.catch((error) => {
console.error(`Error creating folder: ${error}`);
});

  res.status(200).json({
    success: true,
    message: "New Employee added succesfuly",
    employee,
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



//update single user by id  
export const updateSingleEmployee = asyncHandler(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  const { name, email, designation, phoneNumber,city } = req.body;
  console.log(profileId)

  const id = Number(profileId);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: 'Invalid ID provided'
    });
    return;
  }

  const updateEmployee = {
    name: name,
    email: email,
    designation: designation,
    phone_number: phoneNumber,
    city: city,
  };

  const employee = await sp.web.lists.getByTitle("Employees").items.getById(id).update(updateEmployee);

  res.status(200).json({
    success: true,
    message: " Succesfully Updated  Employee Details",
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
