import * as React from 'react';
import { IEmployee } from '../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  employee: IEmployee;
}

const Card: React.FC<Props> = ({ employee }) => {
  const navigate = useNavigate();
  const { Id, name, designation, phone_number, email, Image_url } = employee;
//  console.log(typeof(Id))
  const handleCardClick = (id: number) => {
    console.log(`Card with id ${id} clicked`);
    navigate(`/profile/${id}`);
  };

  return (
    <div
      className="p-4 lg:w-1/3 md:w-1/2 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
      onClick={() =>  Id && handleCardClick(Id)}
    >
      <div className="h-full flex flex-col items-center text-center border rounded-lg border-gray-200 bg-white">
        <img
          alt="team"
          className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4  "
          src={Image_url}
        />
        <div className="w-full">
          <h2 className="title-font font-medium text-lg text-gray-900">{name}</h2>
          <h3 className="text-gray-500 mb-3">{designation}</h3>
          <p className="mb-4">{phone_number}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
