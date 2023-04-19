import * as React from 'react';
import { IEmployee } from '../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  employee: IEmployee;
}

const Card: React.FC<Props> = ({ employee }) => {
  const navigate = useNavigate();
  const { Id, name, designation, phone_number, email, Image_url } = employee;

  const handleCardClick = (id: number) => {
    console.log(`Card with id ${id} clicked`);
    navigate(`/profile/${id}`);
  };

  return (
    <div
      className="p-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
      onClick={() => Id && handleCardClick(Id)}
    >
      <div className="h-full flex flex-col items-center text-center border rounded-lg border-gray-300 bg-white shadow">
        <div className="h-48 w-full rounded-lg overflow-hidden">
          <img
            alt="team"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-300 ease-in-out"
            src={Image_url}
          />
        </div>
        <div className="w-full p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{name}</h2>
          <h3 className="text-sm text-gray-600 mb-2">{designation}</h3>
          <p className="text-gray-500 text-base mb-4">{phone_number}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
