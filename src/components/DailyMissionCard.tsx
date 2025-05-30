
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DailyMissionCard = () => {
  const [watchedTime, setWatchedTime] = useState(2);
  const totalTime = 5;
  const progress = (watchedTime / totalTime) * 100;

  return (
    <TooltipProvider>
      <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg card-hover">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">📚 Today's Lesson</h2>
            <span className="bg-success text-white px-3 py-1 rounded-full text-sm font-semibold animate-xp-flash">
              +50 XP
            </span>
          </div>
          
          <div className="bg-blue-600 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How to Close Faster</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{watchedTime} mins of {totalTime} mins</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 text-lg rounded-lg shadow-md"
                onClick={() => setWatchedTime(Math.min(watchedTime + 1, totalTime))}
              >
                ▶️ Start Now
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Complete this lesson to maintain your streak!</p>
            </TooltipContent>
          </Tooltip>

          <div className="flex items-center gap-2 text-sm bg-blue-700 bg-opacity-50 p-2 rounded">
            <span>ℹ️</span>
            <span>Complete this lesson to maintain your streak and earn XP!</span>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default DailyMissionCard;
