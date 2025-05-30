
import React from 'react';
import { Card } from '@/components/ui/card';

const DailyTipPanel = () => {
  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-purple-50 to-pink-50 card-hover">
      <h2 className="text-xl font-bold text-gray-800">💡 Tip of the Day</h2>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border-l-4 border-gromo-primary">
          <p className="text-gray-700 font-medium">
            "Ask more questions than you answer."
          </p>
        </div>

        <div className="bg-gromo-accent bg-opacity-20 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Quote of the Day</h3>
          <p className="text-gray-700 italic">"Winners are learners"</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-xl">👤</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Peer Update</p>
              <p className="text-sm text-gray-600">
                Your peer Rajesh completed all 2 days! Can you?
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DailyTipPanel;
