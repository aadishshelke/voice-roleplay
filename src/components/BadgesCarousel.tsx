
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BadgesCarousel = () => {
  const badges = [
    { id: 1, name: "Streak Seeker", emoji: "🔥", unlocked: true, description: "Complete 7-day streak" },
    { id: 2, name: "Speedster", emoji: "⚡", unlocked: false, description: "Complete quiz in under 30s" },
    { id: 3, name: "Completer", emoji: "🎯", unlocked: false, description: "Complete 10 quizzes" },
    { id: 4, name: "Early Bird", emoji: "🌅", unlocked: true, description: "Learn before 9 AM" },
    { id: 5, name: "Night Owl", emoji: "🦉", unlocked: false, description: "Learn after 9 PM" },
    { id: 6, name: "Perfectionist", emoji: "💎", unlocked: true, description: "Get 100% on quiz" },
  ];

  return (
    <TooltipProvider>
      <Card className="p-6 space-y-4 card-hover">
        <h2 className="text-xl font-bold text-gray-800">🏅 Badges</h2>
        
        <div className="flex gap-4 overflow-x-auto pb-2">
          {badges.map((badge) => (
            <Tooltip key={badge.id}>
              <TooltipTrigger>
                <div className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                  badge.unlocked 
                    ? 'bg-gradient-to-br from-gromo-accent to-yellow-400 border-gromo-accent shadow-lg transform hover:scale-105' 
                    : 'bg-gray-100 border-gray-300 grayscale'
                }`}>
                  <div className="text-2xl">{badge.emoji}</div>
                  <div className="text-xs font-medium text-center mt-1">{badge.name}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{badge.unlocked ? `✅ ${badge.name}` : `🔒 ${badge.description}`}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-sm text-gromo-primary font-semibold">
            {badges.filter(b => b.unlocked).length} of {badges.length} badges unlocked
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Complete more activities to unlock new badges!
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default BadgesCarousel;
