import React from 'react';

interface SalesPathProps {
  children: React.ReactNode;
}

const SalesPath: React.FC<SalesPathProps> = ({ children }) => {
  return (
    <div className="relative w-full overflow-x-auto pb-8">
      <div className="flex items-center space-x-8 min-w-max px-8">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
    </div>
  );
};

export default SalesPath; 