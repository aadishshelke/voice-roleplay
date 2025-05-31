import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  const practiceScenarios = [
    {
      title: "Handling Term Plan Objections",
      objection: "Nahi bhaiya, insurance mein bharosa nahi hai.",
      suggestedResponse: "Main samajh sakta hoon, lekin aapka family future secure rehna chahiye na?",
      difficulty: "Beginner"
    }
  ];

  const currentScenario = practiceScenarios[0];

  const handleStartPractice = () => {
    setPracticeStarted(true);
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setFeedback({
        confidence: 85,
        tone: 78,
        clarity: 92,
        overall: 85
      });
    }, 3000);
  };

  const handleStartLesson = () => {
    navigate('/roleplay-training/custom', {
      state: {
        scenario: "Practice closing a sales conversation effectively. You'll be the sales representative, and I'll be the customer. Focus on identifying buying signals, addressing objections, and asking for the sale in a professional manner."
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <img 
              src="/GromoLogo.f6c2f6dc.png" 
              alt="GroMo Logo" 
              className="h-8 w-auto"
            />
            <div className="flex gap-4">
              <Button variant="outline">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Today's Lesson */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">📚 Today's Roleplay</h2>
                  <p className="text-sm text-gray-600">+50 XP</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Roleplay
                </Badge>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Sales Closing Techniques</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>2 mins of 5 mins</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <Button 
                  onClick={handleStartLesson}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  ▶️ Start Roleplay
                </Button>
                <p className="text-sm text-gray-600">
                  Complete this roleplay to maintain your streak and earn XP!
                </p>
              </div>
            </Card>

            {/* Streak Tracker */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🔥 Streak Tracker</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">5 Days</p>
                  <p className="text-sm text-gray-600">Current Streak</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">7 Days</p>
                  <p className="text-sm text-gray-600">Best Streak</p>
                </div>
              </div>
            </Card>

            {/* Weekly Challenge */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Weekly Challenge</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">Complete 5 Roleplays</h3>
                  <p className="text-sm text-gray-600">3/5 completed</p>
                  <Progress value={60} className="h-2 mt-2" />
                </div>
                <p className="text-sm text-gray-600">Reward: 200 XP + Special Badge</p>
              </div>
            </Card>
        </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Quiz of the Day */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">❓ Quiz of the Day</h2>
              <div className="space-y-4">
                <p className="text-gray-800">Test your knowledge of sales techniques</p>
                <Button className="w-full">Start Quiz</Button>
        </div>
            </Card>

            {/* Role-Play Practice */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🎭 Role-Play Practice</h2>
              <div className="space-y-4">
                <p className="text-gray-800">Practice your communication skills</p>
                <Link to="/roleplay-practice">
                  <Button className="w-full">Start Practice</Button>
                </Link>
        </div>
            </Card>

            {/* Level & XP */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">⭐ Level & XP</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Level 5</span>
                    <span>450/500 XP</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <p className="text-sm text-gray-600">50 XP to next level</p>
              </div>
            </Card>
        </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Badges */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 Badges</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🥇
                  </div>
                  <p className="text-sm text-gray-600">First Win</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    🔥
                  </div>
                  <p className="text-sm text-gray-600">3 Day Streak</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    ⭐
                  </div>
                  <p className="text-sm text-gray-600">Level 5</p>
                </div>
              </div>
            </Card>

            {/* Tip of the Day */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">💡 Tip of the Day</h2>
              <p className="text-gray-800">
                "When closing a sale, focus on the value you're providing rather than the price. Help the customer see how your solution solves their problem."
              </p>
            </Card>

            {/* Peer Update */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">👥 Peer Update</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sarah completed 5 roleplays</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mike reached Level 6</p>
                    <p className="text-xs text-gray-600">4 hours ago</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Regional Leaderboard */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 Regional Leaderboard</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">1.</span>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <span className="text-sm font-medium">John</span>
                  </div>
                  <span className="text-sm text-gray-600">1200 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">2.</span>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <span className="text-sm font-medium">Emma</span>
                  </div>
                  <span className="text-sm text-gray-600">1150 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">3.</span>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <span className="text-sm font-medium">You</span>
                  </div>
                  <span className="text-sm text-gray-600">1100 XP</span>
                </div>
              </div>
            </Card>

            {/* Calendar View */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 Calendar View</h2>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                      i === 3 ? 'bg-blue-100 text-blue-800' : 'bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
