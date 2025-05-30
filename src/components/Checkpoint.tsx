import React from 'react';
import { Lock, Flag, CheckCircle } from 'lucide-react';

interface CheckpointProps {
  title: string;
  unlocked: boolean;
  completed: boolean;
  onClick: () => void;
}

const Checkpoint: React.FC<CheckpointProps> = ({
  title,
  unlocked,
  completed,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-48 bg-white rounded-xl shadow-lg p-4 transition-all duration-300 ${
          !unlocked ? 'opacity-50' : 'hover:shadow-xl'
        } ${completed ? 'border-2 border-green-500' : ''}`}
      >
        <div className="flex items-center justify-center mb-3">
          {!unlocked ? (
            <Lock className="w-8 h-8 text-gray-400" />
          ) : completed ? (
            <CheckCircle className="w-8 h-8 text-green-500" />
          ) : (
            <Flag className="w-8 h-8 text-blue-500" />
          )}
        </div>

        <h3 className="text-center font-semibold text-gray-800 mb-2">{title}</h3>

        <p className="text-sm text-center text-gray-600 mb-3">
          {!unlocked
            ? 'Complete previous modules to unlock'
            : completed
            ? 'Completed!'
            : 'Ready to test your skills'}
        </p>

        <button
          onClick={onClick}
          disabled={!unlocked}
          className={`w-full py-2 rounded-lg transition-colors ${
            !unlocked
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : completed
              ? 'bg-green-50 text-green-600'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {completed ? 'Completed!' : 'Start Challenge'}
        </button>
      </div>
    </div>
  );
};

export default Checkpoint; 