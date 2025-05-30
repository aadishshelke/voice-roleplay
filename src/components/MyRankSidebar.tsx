import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const MyRankSidebar = () => {
  const currentXP = 360;
  const nextLevelXP = 500;
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="fixed right-0 top-0 w-96 h-screen bg-white shadow-lg p-6 overflow-y-auto">
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gromo-primary to-blue-600 flex items-center justify-center text-white text-4xl mb-4">
            👤
          </div>
          <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
          <p className="text-gray-600">Level 3 • Hustler</p>
        </div>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gromo-primary">Rank #12</div>
            <div className="text-sm text-gray-600">Global Leaderboard</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current XP</span>
              <span className="font-semibold">{currentXP} / {nextLevelXP}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-center text-sm text-gray-600">
              {nextLevelXP - currentXP} XP to next level
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Recent Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl">🎯</div>
              <div>
                <div className="font-medium">Perfect Week</div>
                <div className="text-sm text-gray-600">Completed all daily missions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl">📚</div>
              <div>
                <div className="font-medium">Quick Learner</div>
                <div className="text-sm text-gray-600">Completed 5 lessons in a day</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">🔥</div>
              <div className="font-semibold">7 Days</div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">⭐</div>
              <div className="font-semibold">12</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyRankSidebar; 