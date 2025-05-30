import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, Star } from 'lucide-react';
import LessonNode from './LessonNode';

interface Lesson {
  id: number;
  title: string;
  stars: number;
  type: 'lesson' | 'quiz' | 'roleplay';
  locked: boolean;
}

interface ModuleCardProps {
  title: string;
  stars: number;
  locked: boolean;
  completed: boolean;
  lessons: Lesson[];
  onLessonClick: (lessonId: number) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  stars,
  locked,
  completed,
  lessons,
  onLessonClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderStars = (count: number) => {
    return Array.from({ length: 3 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-64 bg-white rounded-xl shadow-lg p-4 transition-all duration-300 ${
          locked ? 'opacity-50' : 'hover:shadow-xl'
        } ${completed ? 'border-2 border-green-500' : ''}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {locked && <Lock className="w-4 h-4 text-gray-400" />}
            <h3 className="font-semibold text-gray-800">{title}</h3>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(stars)}
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          {lessons.filter(l => !l.locked).length}/{lessons.length} completed
        </div>

        <button
          onClick={() => !locked && setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${
            locked
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
          disabled={locked}
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          <span>{isExpanded ? 'Hide Lessons' : 'Show Lessons'}</span>
        </button>

        {isExpanded && !locked && (
          <div className="mt-4 space-y-3">
            {lessons.map((lesson) => (
              <LessonNode
                key={lesson.id}
                title={lesson.title}
                stars={lesson.stars}
                type={lesson.type}
                locked={lesson.locked}
                onClick={() => !lesson.locked && onLessonClick(lesson.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard; 