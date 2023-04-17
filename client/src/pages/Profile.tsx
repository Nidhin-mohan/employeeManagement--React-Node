import * as React from 'react';
import { useState,useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { IEmployee } from '../../types';
import axios from 'axios';


interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
 
  const [employee, setEmployee] = useState<IEmployee>();  
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
 




  
useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/employee/${id}`);
        setEmployee(response.data.employee);
        console.log(response.data.employee.name)
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, []);

  useEffect(() => {
   console.log("useeffcet",employee);
  }, [employee])
  

  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  const handleDocumentsClick = () => {
    navigate(`/profile/documents/${id}`);
  };

 if(!employee){
    return <> loding...</>
 }

    function handleDelete(id: string | undefined): void {
        throw new Error('Function not implemented.');
    }

    function handleUpdate(): void {
        throw new Error('Function not implemented.');
    }

  return  (
   
    <Layout>
    <div className="flex justify-between">
      <button
        className="text-lg font-medium text-gray-900 hover:text-gray-600"
        onClick={handleProfileClick}
      >
        Profile
      </button>
      <button
        className="text-lg font-medium text-gray-900 hover:text-gray-600"
        onClick={handleDocumentsClick}
      >
        Documents
      </button>
    </div>
  
    <div className="flex justify-center py-10">
      <div className="w-80 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <img src={`${employee.Image_url}`} alt="Employee Picture" className="w-52 h-52 rounded-full" />
          <h1 className="text-3xl font-medium">{employee.name}</h1>
          <p className="text-lg">{employee.email || ""}</p>
        </div>
  
        <div className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Designation:</h2>
            <p className="text-lg">{employee.designation}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Gender:</h2>
            <p className="text-lg">{employee.gender}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Phone Number:</h2>
            <p className="text-lg">{employee.phone_number}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">City:</h2>
            <p className="text-lg">{employee.city}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Date of Birth:</h2>
            <p className="text-lg">{employee.date_of_birth}</p>
          </div>
        </div>
  
        <div className="flex justify-end space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleUpdate}>
            Update
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  </Layout>
  
      );
  };

export default Profile;
