import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const DailyMissionCard = () => {
  const [watchedTime, setWatchedTime] = useState(2);
  const totalTime = 5;
  const progress = (watchedTime / totalTime) * 100;
  const navigate = useNavigate();

  const handleStartRoleplay = () => {
    navigate('/roleplay-training/custom', {
      state: {
        scenario: "Practice closing a sales conversation effectively. You'll be the sales representative, and I'll be the customer. Focus on identifying buying signals, addressing objections, and asking for the sale in a professional manner."
      }
    });
  };

  return (
    <TooltipProvider>
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg card-hover">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">📚 Today's Roleplay</h2>
              <p className="text-sm text-gray-600">+50 XP</p>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Roleplay
            </Badge>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Sales Closing Techniques</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{watchedTime} mins of {totalTime} mins</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg rounded-lg shadow-md"
                onClick={handleStartRoleplay}
              >
                ▶️ Start Roleplay
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Complete this roleplay to maintain your streak!</p>
            </TooltipContent>
          </Tooltip>

          <div className="flex items-center gap-2 text-sm bg-blue-50 p-2 rounded">
            <span>ℹ️</span>
            <span className="text-gray-600">Complete this roleplay to maintain your streak and earn XP!</span>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default DailyMissionCard;
