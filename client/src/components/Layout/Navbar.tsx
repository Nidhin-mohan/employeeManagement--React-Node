import * as React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a7 7 0 10.001 13.999A7 7 0 0010 3zm4.292 8.292a1 1 0 00-1.414-1.414L10 12.586l-2.879-2.879a1 1 0 10-1.414 1.414L8.586 14l-2.879 2.879a1 1 0 101.414 1.414L10 15.414l2.879 2.879a1 1 0 001.414-1.414L11.414 14l2.878-2.879z"/>
              </svg>
              <span className="text-xl font-bold">HR Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
