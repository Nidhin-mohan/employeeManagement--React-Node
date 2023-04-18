import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { IEmployee } from "../../types";
import axios from "axios";
// import defaultImage from "../assets/profile.jpg";

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
  const [employee, setEmployee] = useState<IEmployee>();
  const defaultImage =
    "https://imgs.search.brave.com/aorxXvzVvKB-bT08hlS1UULTqIyNjIx-JVY4PxdxYBQ/rs:fit:300:300:1/g:ce/aHR0cHM6Ly93d3cu/d29ybGRmdXR1cmVj/b3VuY2lsLm9yZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/Mi9kdW1teS1wcm9m/aWxlLXBpYy0zMDB4/MzAwLTEucG5n";
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/employee/${id}`
        );
        setEmployee(response.data.employee);
        console.log(response.data.employee.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, []);

  useEffect(() => {
    console.log("useeffcet", employee);
  }, [employee]);

  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  const handleDocumentsClick = () => {
    navigate(`/profile/documents/${id}`);
  };

  if (!employee) {
    return <> loding...</>;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/employee/${id}`);
      // Navigate to the home page after the request is completed
      navigate(`/`);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }

  function handleUpdate(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Layout>
      {/* profile  */}
      <div className="flex   bg-slate-300 py-40 ">
        <div className="w-2/5 flex items-center justify-center  rounded-e-xl px-20 flex-col ">
          <div className="">
            <img
              src={employee.Image_url ? employee.Image_url : defaultImage}
              alt="Employee Picture"
              className="w-52 h-52 rounded-full"
            />
          </div>
          <div className="text-center pt-2 ">
            <h1 className="text-3xl font-medium">{employee.name}</h1>
            <p className="text-lg">{employee.email || ""}</p>
            <p className="text-lg">{employee.designation}</p>
          </div>
        </div>
        <div className="w-3/5">
          <div className=" w-[600px]">
            <div className="flex justify-between m-5">
              <h2 className="text-xl font-medium">Designation:</h2>
              <p className="text-lg">{employee.designation}</p>
            </div>
            <div className="flex justify-between m-5 ">
              <h2 className="text-xl font-medium">Gender:</h2>
              <p className="text-lg">{employee.gender}</p>
            </div>
            <div className="flex justify-between m-5">
              <h2 className="text-xl font-medium">Phone Number:</h2>
              <p className="text-lg">{employee.phone_number}</p>
            </div>
            <div className="flex justify-between m-5">
              <h2 className="text-xl font-medium">City:</h2>
              <p className="text-lg">{employee.city}</p>
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
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={handleUpdate}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
