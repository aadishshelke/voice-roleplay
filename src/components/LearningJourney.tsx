
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const LearningJourney = () => {
  const journeyNodes = [
    { id: 1, type: 'video', completed: true, locked: false, title: 'Introduction' },
    { id: 2, type: 'quiz', completed: true, locked: false, title: 'Basics Quiz' },
    { id: 3, type: 'video', completed: true, locked: false, title: 'Advanced Tips' },
    { id: 4, type: 'quiz', completed: false, locked: false, title: 'Current Quiz', current: true },
    { id: 5, type: 'video', completed: false, locked: true, title: 'Expert Module' },
    { id: 6, type: 'badge', completed: false, locked: true, title: 'Master Badge' },
  ];

  const getNodeIcon = (type: string, completed: boolean, locked: boolean, current?: boolean) => {
    if (locked) return '🔒';
    if (current) return '📍';
    if (completed) return type === 'video' ? '🎥✅' : type === 'quiz' ? '🧠✅' : '🏆';
    return type === 'video' ? '🎥' : type === 'quiz' ? '🧠' : '🏆';
  };

  return (
    <TooltipProvider>
      <Card className="p-6 space-y-4 bg-gradient-to-br from-green-50 to-blue-50 card-hover">
        <h2 className="text-xl font-bold text-gray-800">🗺️ Learning Journey</h2>
        
        <div className="relative">
          {/* Journey Path */}
          <div className="flex flex-wrap gap-4 items-center">
            {journeyNodes.map((node, index) => (
              <div key={node.id} className="flex items-center">
                <Tooltip>
                  <TooltipTrigger>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 border-4 ${
                      node.current 
                        ? 'bg-gromo-primary border-gromo-primary text-white animate-bounce-in' 
                        : node.completed 
                          ? 'bg-gromo-success border-gromo-success text-white' 
                          : node.locked 
                            ? 'bg-gray-200 border-gray-300 text-gray-400' 
                            : 'bg-white border-gromo-primary text-gromo-primary hover:scale-105'
                    }`}>
                      {getNodeIcon(node.type, node.completed, node.locked, node.current)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {node.locked ? `🔒 Unlock after 3-day streak` : node.title}
                    </p>
                  </TooltipContent>
                </Tooltip>
                
                {index < journeyNodes.length - 1 && (
                  <div className={`w-8 h-1 mx-2 ${
                    journeyNodes[index + 1].completed ? 'bg-gromo-success' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-gray-800">Tip of the Day</span>
          </div>
          <p className="text-gray-600">"Ask more questions than you answer."</p>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">👤</span>
              <span className="text-sm text-gray-600">
                Your peer Rajesh completed all 2 days! Can you?
              </span>
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default LearningJourney;
