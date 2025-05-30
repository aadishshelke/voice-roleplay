import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Trophy, Zap } from 'lucide-react';

const XPLevelPanel = () => {
  const currentXP = 1250;
  const nextLevelXP = 2000;
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-800">XP Level</h2>
        </div>
        <div className="text-2xl font-bold text-yellow-600">Level 3</div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress to Level 4</span>
            <span className="font-medium text-yellow-600">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{currentXP} XP</span>
            <span>{nextLevelXP} XP</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-sm font-medium">12</div>
            <div className="text-xs text-gray-500">Badges</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Zap className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-sm font-medium">7</div>
            <div className="text-xs text-gray-500">Streak</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Star className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-sm font-medium">3</div>
            <div className="text-xs text-gray-500">Level</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default XPLevelPanel;
