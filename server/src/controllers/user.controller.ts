import { Request, Response } from "express";
import { sp } from '@pnp/sp-commonjs';
// import '@pnp/sp/webs';
// import '@pnp/sp/folders';
import fileUpload from 'express-fileupload';
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";
import getContentType from "../utils/getContentType";


// get all employees from list

export const getAllEmployees = asyncHandler(async (req: Request, res: Response) => {

  const employees = await sp.web.lists.getByTitle("Employees").items.orderBy('Modified', false).getAll();

  res.status(200).json({
    success: true,
    message: "Fetched all employees from list",
    employees,
  });
});

//Add new Employee
export const addEmployee = asyncHandler(async (req: Request, res: Response) => {

  const { name, email, designation, phone_number, city, gender, date_of_birth } = req.body;

  if (!name || !email || !designation || !phone_number || !city || !gender || !date_of_birth) {
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
  const newFolderName = `${folderName}`;
  const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
  documentLibrary.rootFolder.folders.addUsingPath(newFolderName)
    .then(() => {
      console.log(`Folder '${newFolderName}' created successfully.`);
    })
    .catch((error: any) => {
      console.error(`Error creating folder: ${error}`);
    });

  res.status(200).json({
    success: true,
    message: "New Employee added succesfuly",
    employee,
    folderName,
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
  const { name, email, designation, phone_number, city } = req.body;
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
    phone_number: phone_number,
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

  const id = Number(profileId);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: 'Invalid ID provided'
    });
    return;
  }

  const employee = await sp.web.lists.getByTitle('Employees').items.getById(id).delete();

  const folderUrl = `EmployeeLibrary/${id}`;
     await sp.web.getFolderByServerRelativeUrl(folderUrl).delete();

  res.status(200).json({
    success: true,
    message: "User Deleted succesfullly",

  });
});

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  let image = (req?.files as any)?.image;

  console.log("imagetype",image)

  const id = Number(profileId);

  if (!image) {
    console.error('No file selected');
    return res.status(400).json({
      success: false,
      message: 'No file selected',
    });
  }

  const documentLibraryName = `EmployeeLibrary/${id}`;
  const fileNamePath = `profilepic.png`;

  let result: any;
  if (image?.size <= 10485760) {
    // small upload
    console.log('Starting small file upload');
    result = await sp.web.getFolderByServerRelativePath
    (documentLibraryName).files.addUsingPath(fileNamePath, image.data, { Overwrite: true });
  } else {
    // large upload
    console.log('Starting large file upload');
    result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, image, ()  => {
      console.log(`Upload progress: `);
    }, true);
  }

  console.log('Server relative URL:', result?.data?.ServerRelativeUrl);
  const url = `https://2mxff3.sharepoint.com${result?.data?.ServerRelativeUrl}`;

  const list = sp.web.lists.getByTitle('Employees');

  try {
    await list.items.getById(id).update({
      Image_url: url,
    });

    console.log('File upload successful');
    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
    });
  } catch (error) {
    console.error('Error while updating employee item:', error);
    res.status(500).json({
      success: false,
      message: 'Error while updating employee item',
    });
  }
});

//upload document to userfolder by id  
export const uploadDocument = asyncHandler(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  let file = (req?.files as any)?.file;

  console.log("imagetype",file)

  const id = Number(profileId);

  if (!file) {
    console.error('No file selected');
    return res.status(400).json({
      success: false,
      message: 'No file selected',
    });
  }

  const documentLibraryName = `EmployeeLibrary/${id}`;
  const fileNamePath = file.name;

  let result: any;
  if (file?.size <= 10485760) {
    // small upload
    console.log('Starting small file upload');
    result = await sp.web.getFolderByServerRelativePath
    (documentLibraryName).files.addUsingPath(fileNamePath, file.data, { Overwrite: true });
  } else {
    // large upload
    console.log('Starting large file upload');
    result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, file, ()  => {
      console.log(`Upload progress: `);
    }, true);
  }

  res.status(200).json({
    success: true,
    message: "Document Uploaded succesfullly",

  });
});

// Get all files in a directory
export const getFilesInDirectory = asyncHandler(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  const id = profileId;
  console.log("files listn")
  const documentLibraryName = `EmployeeLibrary/${id}`;

  try {
    const folder = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.get();
    console.log(folder)
    const files = folder.map((file: any) => {
      return file;
    });

    res.status(200).json({
      success: true,
      message: 'Retrieved files in directory',
      files
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error retrieving files in directory',
    });
  }
});

//download files from server relative url
export const downloadFile = asyncHandler(async (req: Request, res: Response) => {
  const serverRelativePath = req.query.serverRelativePath as string;
  const file = sp.web.getFileByServerRelativePath(serverRelativePath);
  const buffer: ArrayBuffer = await file.getBuffer();
  
  const fileName = serverRelativePath.split('/').pop() || ''; // get the file name with extension
  const contentType = getContentType(fileName); // get the content type based on file extension

  res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
  res.setHeader('Content-type', contentType);
  res.status(200).send(Buffer.from(buffer));
});


//delete single user by id  
export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
  const serverRelativePath = req.query.serverRelativePath as string;
  console.log(serverRelativePath)
     await sp.web.getFolderByServerRelativeUrl(serverRelativePath).delete();

  res.status(200).json({
    success: true,
    message: "File deleted succes fully",

  });
});






