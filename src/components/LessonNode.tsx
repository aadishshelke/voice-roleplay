import React from 'react';
import { BookOpen, HelpCircle, Users, Star } from 'lucide-react';

interface LessonNodeProps {
  title: string;
  stars: number;
  type: 'lesson' | 'quiz' | 'roleplay';
  locked: boolean;
  onClick: () => void;
}

const LessonNode: React.FC<LessonNodeProps> = ({
  title,
  stars,
  type,
  locked,
  onClick,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4" />;
      case 'roleplay':
        return <Users className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getBgColor = () => {
    if (locked) return 'bg-gray-100';
    switch (type) {
      case 'lesson':
        return 'bg-blue-50 hover:bg-blue-100';
      case 'quiz':
        return 'bg-purple-50 hover:bg-purple-100';
      case 'roleplay':
        return 'bg-green-50 hover:bg-green-100';
      default:
        return 'bg-blue-50 hover:bg-blue-100';
    }
  };

  const getBorderColor = () => {
    if (locked) return 'border-gray-200';
    switch (type) {
      case 'lesson':
        return 'border-blue-200';
      case 'quiz':
        return 'border-purple-200';
      case 'roleplay':
        return 'border-green-200';
      default:
        return 'border-blue-200';
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 3 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`w-full flex items-center justify-between p-2 rounded-lg border transition-all duration-200 ${
        locked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${getBgColor()} ${getBorderColor()}`}
    >
      <div className="flex items-center space-x-2">
        {getIcon()}
        <span className={`text-sm ${locked ? 'text-gray-400' : 'text-gray-700'}`}>
          {title}
        </span>
      </div>
      <div className="flex items-center space-x-1">
        {renderStars(stars)}
      </div>
    </button>
  );
};

export default LessonNode; 