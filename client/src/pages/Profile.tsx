import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout/Layout";
import { IEmployee } from "../../types";
import axios from "axios";
import Spinner from "../components/Spinner";
import ProfileNav from "../components/ProfileNav";
// import defaultImage from "../assets/profile.jpg";
const defaultImage =
  "https://imgs.search.brave.com/aorxXvzVvKB-bT08hlS1UULTqIyNjIx-JVY4PxdxYBQ/rs:fit:300:300:1/g:ce/aHR0cHM6Ly93d3cu/d29ybGRmdXR1cmVj/b3VuY2lsLm9yZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/Mi9kdW1teS1wcm9m/aWxlLXBpYy0zMDB4/MzAwLTEucG5n";

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
  const [employee, setEmployee] = useState<IEmployee>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/employee/${id}`
        );
        setEmployee(response.data.employee);
        console.log(response.data.employee.name);
        setName(response.data.employee.name);
        setEmail(response.data.employee.email);
        setDesignation(response.data.employee.designation);
        setPhoneNumber(response.data.employee.phone_number);
        setCity(response.data.employee.city);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, []);

  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  const handleDocumentsClick = () => {
    navigate(`/profile/documents/${id}`);
  };

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.put(
        `${BASE_URL}/employee/pic/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast.success("Profile pic uploaded sucsesfuly", {
        className: "toastify-success",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/employee/${id}`);
      // Navigate to the home page after the request is completed
      toast.error("Employee Deleted Succesfuly", {
        className: "toastify-error",
      });
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = async () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleUpdate = async () => {
    const updatedEmployee = {
      name: name,
      email: email,
      designation: designation,
      phone_number: phoneNumber,
      city: city,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/employee/${id}`,
        updatedEmployee
      );
      console.log(`response ${response}`);
      toast.success("Employee details Updated Successfully", {
        className: "toastify-success",
      });
            navigate(`/profile/${response?.data?.folderName}`);

    } catch (error) {
      console.error(error);
    }
  };

  if (!employee) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <Layout>
      {/* profile  */}
      <ProfileNav id={Number(id)} />
      <div className="   flex-row lg:flex  bg-slate-300 py-40 ">
        <div className="w-2/5 flex items-center justify-center  rounded-e-xl px-20 flex-col ">
          <div className="">
            <img
              src={employee.Image_url ? employee.Image_url : defaultImage}
              alt="Employee Picture"
              className="w-52 h-52 rounded-full"
            />
          </div>

          <div className="text-center pt-2 ">
            {isEditing ? (
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  id="name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Name"
                />

                <input
                  type="text"
                  id="emailInput"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email"
                />
                <div>
                  <label
                    htmlFor="fileInput"
                    className="block w-max mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    <span>Choose File</span>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                  {selectedFile && (
                    <p className="text-green-500 text-center">
                      File Selected: {selectedFile.name}
                    </p>
                  )}
                  <button
                    disabled={!selectedFile}
                    onClick={handleFileUpload}
                    className="block mx-auto my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  >
                    {selectedFile ? "Upload Selected File" : "Upload"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-medium">{employee.name}</h1>
                <p className="text-lg">{employee.email || ""}</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-3/5">
          <div className=" w-[600px]">
            <div className="flex justify-between m-5">
              <h2 className="text-xl font-medium">Designation:</h2>
              {isEditing ? (
                <input
                  type="text"
                  className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              ) : (
                <p className="text-lg">{employee.designation}</p>
              )}
            </div>
            <div className="flex justify-between m-5 ">
              <h2 className="text-xl font-medium">Gender:</h2>
              <p className="text-lg">{employee.gender}</p>
            </div>
            <div className="flex justify-between m-5">
              <h2 className="text-xl font-medium">Phone Number:</h2>
              {isEditing ? (
                <input
                  type="text"
                  className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              ) : (
                <p className="text-lg">{employee.phone_number}</p>
              )}
            </div>
            <div className="flex justify-between m-5">
              <h2 className="text-xl font-medium">City:</h2>
              {isEditing ? (
                <input
                  type="text"
                  className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              ) : (
                <p className="text-lg">{employee.city}</p>
              )}
            </div>
            <div className="flex justify-between m-5">
              <h2 className="text-xl font-medium">Date of Birth:</h2>
              {employee?.date_of_birth ? (
                <p>
                  {new Date(employee.date_of_birth).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </p>
              ) : (
                <p>N/A</p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={handleEdit}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing ? (
                <button
                  className="bg-blue-600 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
