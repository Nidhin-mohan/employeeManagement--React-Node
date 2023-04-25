import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";


interface AddEmployeeProps {}

const AddEmployee: React.FC<AddEmployeeProps> = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const newEmployee = {
      name: name,
      email: email,
      designation: designation,
      gender: gender,
      phone_number: phoneNumber,
      city: city,
      date_of_birth: dateOfBirth,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/employee/add`,
        newEmployee
      );     
      toast.success("Emplyee added Succesfuly", {
        className: "toastify-success",
      });
      setIsSubmitting(false);
      navigate(`/profile/${response?.data?.folderName}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="p-8 flex bg-stone-300 flex-col  items-start justify-center mx-auto ">
       <div   className="flex flex-col space-y-4 w-[500px] mx-auto">
       <h1 className="text-3xl font-bold mb-8 text-center">Add Employee</h1>
       </div>
        <form
          className="flex flex-col space-y-4 w-[500px] mx-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block font-semibold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="border-gray-300 border rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="border-gray-300 border rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Gender:</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="form-radio border-gray-300 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  required
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio border-gray-300 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={gender === "Other"}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio border-gray-300 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="designation">
              Designation:
            </label>
            <select
              className="border-gray-300 border rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="designation"
              id="designation"
              required
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value=""></option>
              <option value="Intern">Intern</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="phone_no">
              Phone Number:
            </label>
            <input
              className="border-gray-300 border rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="phone_no"
              required
              id="phone_no"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="city">
              City:
            </label>
            <input
              className="border-gray-300 border rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="city"
              id="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="date_of_birth">
              Date of Birth:
            </label>
            <input
              className="border-gray-300 border rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              name="date_of_birth"
              id="date_of_birth"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isSubmitting}
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddEmployee;
