import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const GamificationSection = () => {
  const challenges = [
    { title: "Weekly Streak", progress: 75, target: 7, current: 5, reward: "500 XP" },
    { title: "Learning Goals", progress: 60, target: 10, current: 6, reward: "300 XP" },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🎮 Active Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge, index) => (
          <Card key={index} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
              <div className="text-sm font-medium text-gromo-primary">
                {challenge.current}/{challenge.target}
              </div>
            </div>
            
            <Progress value={challenge.progress} className="h-2 mb-4" />
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {challenge.target - challenge.current} more to complete
              </div>
              <div className="text-sm font-medium text-gromo-accent">
                Reward: {challenge.reward}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GamificationSection; 