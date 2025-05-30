import React from 'react';
import { Card } from '@/components/ui/card';
import { Flame } from 'lucide-react';

const StreakTracker = () => {
  const streak = 7; // 7 days streak
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-800">Learning Streak</h2>
        </div>
        <div className="text-2xl font-bold text-orange-500">{streak} 🔥</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={day}
            className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
              index < streak
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Keep your streak going! Don't break the chain.
        </p>
      </div>
    </Card>
  );
};

export default StreakTracker;
