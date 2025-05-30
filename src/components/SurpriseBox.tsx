import React from 'react';
import { Gift, Sparkles } from 'lucide-react';

interface SurpriseBoxProps {
  opened: boolean;
  onOpen: () => void;
}

const SurpriseBox: React.FC<SurpriseBoxProps> = ({ opened, onOpen }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-32 h-32 bg-white rounded-xl shadow-lg p-4 transition-all duration-300 ${
          opened ? 'opacity-50' : 'hover:shadow-xl cursor-pointer'
        }`}
        onClick={() => !opened && onOpen()}
      >
        <div className="w-full h-full flex items-center justify-center">
          {opened ? (
            <Sparkles className="w-12 h-12 text-yellow-400" />
          ) : (
            <Gift className="w-12 h-12 text-purple-500" />
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {opened ? 'Opened!' : 'Click to open'}
      </p>
    </div>
  );
};

export default SurpriseBox; 