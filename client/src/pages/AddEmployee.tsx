import axios from "axios";
import { useState } from "react";
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

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        `http://localhost:5000/api/v1/employee/add`,
        newEmployee
      );
      console.log(`responce ${response}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="p-8 flex bg-stone-300 flex-col  items-start justify-center mx-auto ">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Employee</h1>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="gender">
              Gender:
            </label>
            <select
              className="border-gray-300 border rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="designation">
              Designation:
            </label>
            <input
              className="border-gray-300 border rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="designation"
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="phone_no">
              Phone Number:
            </label>
            <input
              className="border-gray-300 border rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="phone_no"
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
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
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
