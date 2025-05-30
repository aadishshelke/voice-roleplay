import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Star, Zap, Target, BookOpen, Award } from 'lucide-react';

const AchievementsPanel = () => {
  const achievements = [
    {
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
      title: "Early Bird",
      description: "Complete 5 morning sessions",
      progress: 3,
      total: 5
    },
    {
      icon: <Star className="h-5 w-5 text-purple-500" />,
      title: "Quiz Master",
      description: "Score 100% on 3 quizzes",
      progress: 1,
      total: 3
    },
    {
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      title: "Streak Warrior",
      description: "Maintain a 7-day streak",
      progress: 5,
      total: 7
    },
    {
      icon: <Target className="h-5 w-5 text-red-500" />,
      title: "Goal Getter",
      description: "Complete 10 daily goals",
      progress: 7,
      total: 10
    },
    {
      icon: <BookOpen className="h-5 w-5 text-green-500" />,
      title: "Knowledge Seeker",
      description: "Read 20 articles",
      progress: 12,
      total: 20
    },
    {
      icon: <Award className="h-5 w-5 text-orange-500" />,
      title: "Social Butterfly",
      description: "Participate in 5 discussions",
      progress: 2,
      total: 5
    }
  ];

  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Trophy className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-800">Achievements</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white p-3 md:p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                {achievement.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 truncate">{achievement.title}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{achievement.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-purple-600">
                    {achievement.progress}/{achievement.total}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-purple-500 h-1.5 rounded-full"
                    style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AchievementsPanel; 