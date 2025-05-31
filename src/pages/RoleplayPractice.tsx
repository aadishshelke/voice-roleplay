import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const scenarios = [
  {
    id: 1,
    title: 'Customer Service Call',
    description: 'Practice handling customer complaints and inquiries',
    difficulty: 'Beginner',
    duration: '10 minutes'
  },
  {
    id: 2,
    title: 'Sales Pitch',
    description: 'Practice your sales presentation skills',
    difficulty: 'Intermediate',
    duration: '15 minutes'
  },
  {
    id: 3,
    title: 'Job Interview',
    description: 'Practice common interview questions and responses',
    difficulty: 'Advanced',
    duration: '20 minutes'
  }
];

const RoleplayPractice: React.FC = () => {
  const navigate = useNavigate();
  const [customScenario, setCustomScenario] = useState('');

  const handleCustomScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (customScenario.trim()) {
      // Navigate to roleplay training with custom scenario
      navigate('/roleplay-training/custom', { state: { scenario: customScenario } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Roleplay Practice</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Custom Scenario Box */}
        <Card className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">✨ Create Custom Scenario</h2>
          <form onSubmit={handleCustomScenario} className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter your custom scenario..."
                value={customScenario}
                onChange={(e) => setCustomScenario(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                Start Practice
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Create your own scenario and practice with AI feedback
            </p>
          </form>
        </Card>

        {/* Predefined Scenarios */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.id}
              to={`/roleplay-training/${scenario.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {scenario.title}
                </h2>
                <p className="text-gray-600 mb-4">{scenario.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Difficulty: {scenario.difficulty}</span>
                  <span>Duration: {scenario.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RoleplayPractice; 