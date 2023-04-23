import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { IEmployee } from "../../types";
import Layout from "../components/Layout/Layout";
import Spinner from "../components/Spinner";
// import { EmployeeContext } from '../context/employeeContext';

const Home = (): JSX.Element => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //   const filteredEmployees = employees.filter((employee) => {
  //     return employee.name.toLowerCase().includes(searchTerm.toLowerCase());
  //   });

  const handleAddEmployeeClick = () => {
    console.log("Add Employee button clicked");
    navigate("/add-emplyee");
  };

  const filteredEmployees = employees.filter((employee) => {
    return employee?.name?.toLowerCase().includes(searchTerm?.toLowerCase());
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/employees"
        );
        setEmployees(response.data.employees);
        console.log(searchTerm);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <Layout>
      <div>
        {isLoading ? (
          <Spinner  />
        ) : (
          <section className="bg-slate-400 text-gray-600 min-h-screen">
            <div className="flex justify-between items-center pl-12 w-[800px]  py-4 px-6">
              <input
                type="text"
                name="searchTerm"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-96 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md ml-4"
              >
                Search
              </button>
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md ml-4"
                onClick={handleAddEmployeeClick}
              >
                Add Employee
              </button>
            </div>

            <div className="container px-5 py-10 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                
              </div>
              <div className="flex flex-wrap -m-4">
                {/* rendering cards */}

                {filteredEmployees.map((employee) => (
                  <Card employee={employee} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Home;
