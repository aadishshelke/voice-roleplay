import React from 'react';
import { Card } from '@/components/ui/card';

const PodiumSection = () => {
  const topUsers = [
    { rank: 2, name: "Rajesh Kumar", xp: 1180, badge: "🥈" },
    { rank: 1, name: "Priya Sharma", xp: 1250, badge: "🥇" },
    { rank: 3, name: "Anjali Patel", xp: 1050, badge: "🥉" },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 Top Performers</h2>
      <div className="flex items-end justify-center gap-4 h-64">
        {topUsers.map((user, index) => (
          <Card 
            key={user.rank}
            className={`w-48 p-4 text-center transition-all duration-300 ${
              index === 1 
                ? 'h-64 bg-gradient-to-b from-gromo-accent to-yellow-400 text-white' 
                : 'h-48 bg-white'
            }`}
          >
            <div className="text-4xl mb-2">{user.badge}</div>
            <div className="font-bold text-lg mb-1">{user.name}</div>
            <div className="text-sm opacity-90">{user.xp} XP</div>
            <div className="mt-2 text-sm">Rank #{user.rank}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PodiumSection; 