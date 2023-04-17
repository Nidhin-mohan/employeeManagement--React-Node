import * as React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-white text-gray-800  bottom-0 w-full">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex justify-between">
        <div className="text-xl font-bold">HR Portal</div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
