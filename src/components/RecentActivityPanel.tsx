import React from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, Trophy, Star, Zap, Target, Award } from 'lucide-react';

const RecentActivityPanel = () => {
  const activities = [
    {
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      title: "Completed Module",
      description: "Advanced Sales Techniques",
      time: "2 hours ago",
      xp: "+50 XP"
    },
    {
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
      title: "Earned Badge",
      description: "Quick Learner",
      time: "4 hours ago",
      xp: "+25 XP"
    },
    {
      icon: <Star className="h-5 w-5 text-purple-500" />,
      title: "Quiz Completed",
      description: "Product Knowledge Quiz",
      time: "Yesterday",
      xp: "+75 XP"
    },
    {
      icon: <Zap className="h-5 w-5 text-green-500" />,
      title: "Streak Extended",
      description: "5 Day Learning Streak",
      time: "Yesterday",
      xp: "+30 XP"
    },
    {
      icon: <Target className="h-5 w-5 text-red-500" />,
      title: "Goal Achieved",
      description: "Daily Learning Goal",
      time: "2 days ago",
      xp: "+20 XP"
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="flex items-center gap-2 mb-6">
        <Award className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                {activity.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">{activity.xp}</span>
                </div>
                <div className="mt-2 text-xs text-gray-400">{activity.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivityPanel; 