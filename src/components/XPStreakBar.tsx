import React from 'react';
import { Star, Flame, Target } from 'lucide-react';

interface XPStreakBarProps {
  xp: number;
  maxXP: number;
  streak: number;
  dailyGoal: number;
  dailyProgress: number;
  isSidebarCollapsed: boolean;
}

const XPStreakBar: React.FC<XPStreakBarProps> = ({
  xp,
  maxXP,
  streak,
  dailyGoal,
  dailyProgress,
  isSidebarCollapsed,
}) => {
  const xpPercentage = (xp / maxXP) * 100;
  const dailyPercentage = (dailyProgress / dailyGoal) * 100;

  return (
    <div 
      className={`fixed top-0 bg-white shadow-md z-50 transition-all duration-300 ${
        isSidebarCollapsed ? 'left-[70px] right-0' : 'left-[250px] right-0'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-3 gap-4">
          {/* XP Progress */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{xp} XP</span>
                <span className="text-gray-500">Level Progress</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{streak}</span>
                <span className="text-gray-500">Day Streak</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${(streak / 7) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Daily Goal */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Target className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{dailyProgress}/{dailyGoal}</span>
                <span className="text-gray-500">Daily Goal</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${dailyPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XPStreakBar; 