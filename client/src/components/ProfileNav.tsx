import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
}

const ProfileNav: FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  const handleDocumentsClick = () => {
    navigate(`/profile/documents/${id}`);
  };

  return (
    <div className="flex gap-4  bg-slate-300 py-2 ">
      <button
        className="px-4 py-2 ml-3 bg-blue-500  hover:bg-blue-600 text-white rounded"
        onClick={handleProfileClick}
      >
        Profile
      </button>
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onClick={handleDocumentsClick}
      >
        Documents
      </button>
    </div>
  );
};

export default ProfileNav;
