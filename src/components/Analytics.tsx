import React from 'react';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">Track your performance and identify areas for improvement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Practice Sessions</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
              <p className="text-green-600 text-sm">+12% this week</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Session Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.2</p>
              <p className="text-green-600 text-sm">+0.3 improvement</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Study Time</p>
              <p className="text-2xl font-bold text-gray-900">18h</p>
              <p className="text-blue-600 text-sm">2.5h this week</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
              <p className="text-green-600 text-sm">+5% this month</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
          <div className="space-y-4">
            {[
              { day: 'Mon', minutes: 82 },
              { day: 'Tue', minutes: 79 },
              { day: 'Wed', minutes: 31 },
              { day: 'Thu', minutes: 35 },
              { day: 'Fri', minutes: 32 },
              { day: 'Sat', minutes: 83 },
              { day: 'Sun', minutes: 59 }
            ].map(({ day, minutes }) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-gray-600 w-12">{day}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(minutes / 120) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-gray-600 text-sm w-16 text-right">{minutes} min</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Breakdown</h3>
          <div className="space-y-4">
            {[
              { skill: 'Communication', percentage: 92, color: 'bg-green-500' },
              { skill: 'Product Knowledge', percentage: 78, color: 'bg-blue-500' },
              { skill: 'Objection Handling', percentage: 65, color: 'bg-yellow-500' },
              { skill: 'Closing Techniques', percentage: 58, color: 'bg-red-500' }
            ].map(({ skill, percentage, color }) => (
              <div key={skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700">{skill}</span>
                  <span className="text-gray-600">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">✅ Strengths</h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Excellent communication skills</li>
              <li>• Consistent daily practice</li>
              <li>• High engagement in roleplay sessions</li>
            </ul>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2">📈 Areas for Growth</h4>
            <ul className="text-orange-700 text-sm space-y-1">
              <li>• Focus on closing techniques</li>
              <li>• Practice more complex objection scenarios</li>
              <li>• Increase voice coaching sessions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics; 