
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const WeeklyPunchCard = () => {
  const [completedDays] = useState(3);
  const targetDays = 5;
  const progress = (completedDays / targetDays) * 100;

  const weekDays = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: false },
    { day: 'Fri', completed: false },
  ];

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-green-50 to-emerald-50 card-hover">
      <h2 className="text-xl font-bold text-gray-800">🎯 Weekly Challenge</h2>
      
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-700 mb-2">
          Complete 5 lessons this week
        </div>
        <div className="text-3xl mb-2">🎁</div>
        <div className="text-gromo-primary font-semibold">Mystery Box Reward!</div>
      </div>

      <div className="space-y-3">
        <Progress value={progress} className="h-3" />
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{completedDays} of {targetDays} completed</span>
          <span>{targetDays - completedDays} more to go!</span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
                day.completed 
                  ? 'bg-gromo-success text-white shadow-md' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {day.completed ? '✅' : index + 1}
              </div>
              <span className="text-xs text-gray-600 mt-1 block">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {progress === 100 && (
        <div className="bg-gromo-accent bg-opacity-20 p-4 rounded-lg text-center animate-bounce-in">
          <div className="text-lg font-bold text-gromo-primary">🎉 Challenge Complete!</div>
          <div className="text-sm text-gray-600">Claim your mystery box reward!</div>
        </div>
      )}
    </Card>
  );
};

export default WeeklyPunchCard;
