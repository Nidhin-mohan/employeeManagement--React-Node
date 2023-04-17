
import Layout from './Layout/Layout';

import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { IEmployee } from '../../types';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { EmployeeContext } from '../context/employeeContext';







const Home = (): JSX.Element => {

    const [employees, setEmployees] = useState<IEmployee[]>([]);
//   const [searchTerm, setSearchTerm] = React.useState(''); 
  const navigate = useNavigate();

 

//   const filteredEmployees = employees.filter((employee) => {
//     return employee.name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

const handleAddEmployeeClick = () => {
  console.log('Add Employee button clicked');
  navigate('/add-emplyee');
};

useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/employees');
        setEmployees(response.data.employees);
        console.log(response.data.employees)
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

 
  return (
      <Layout>
       
        <section className="bg-[#a3a3a3] text-gray-600 body-font">
  <div className="container px-5 py-10 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">Employees</h1>
    </div>
    <div className="flex flex-wrap -m-4">
        {/* rendering cards */}

        {employees.map((employee) => <Card employee={employee}/>)} 
     


    </div>
  </div>
</section>


      </Layout> 
  );
};

export default Home;
