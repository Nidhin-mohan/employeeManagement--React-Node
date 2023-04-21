import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Props {
  id: number;
}

const ProfileNav: FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  const handleDocumentsClick = () => {
    navigate(`/profile/documents/${id}`);
  };

  const handleHomeClick = () => {
    navigate(`/`);
  };

  return (
    <div className="flex gap-4  bg-slate-300 py-2 ">
    <button
      className={`px-4 py-2 ml-3 ${location.pathname === "/" ? "bg-yellow-500 text-black" : "bg-blue-500"} hover:bg-blue-600 text-white rounded`}
      onClick={handleHomeClick}
    >
      Back
    </button>
    <button
      className={`px-4 py-2 ml-3 ${location.pathname === `/profile/${id}` ? "bg-yellow-500 text-black" : "bg-blue-500"}  hover:bg-blue-600 text-white rounded`}
      onClick={handleProfileClick}
    >
      Profile
    </button>
    <button
      className={`px-4 py-2 ${location.pathname === `/profile/documents/${id}` ? "bg-yellow-500 text-black" : "bg-blue-500"} hover:bg-blue-600 text-white rounded`}
      onClick={handleDocumentsClick}
    >
      Documents
    </button>
  </div>
  );
};

export default ProfileNav;
