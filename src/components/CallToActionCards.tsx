import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, MessageSquare, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToActionCards = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Learning Modules",
      description: "Access structured learning paths and track your progress",
      icon: <BookOpen className="h-6 w-6" />,
      buttonText: "Start Learning",
      gradient: "from-blue-500 to-indigo-500",
      onClick: () => navigate('/learning-modules')
    },
    {
      title: "Roleplay Practice",
      description: "Practice sales scenarios with AI-powered feedback",
      icon: <MessageSquare className="h-6 w-6" />,
      buttonText: "Start Practice",
      gradient: "from-purple-500 to-pink-500",
      onClick: () => navigate('/roleplay-practice')
    },
    {
      title: "Voice Chat Coach",
      description: "Get real-time coaching during customer calls",
      icon: <Mic className="h-6 w-6" />,
      buttonText: "Start Session",
      gradient: "from-green-500 to-teal-500",
      onClick: () => navigate('/voice-chat-coach')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex flex-col h-full">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${action.gradient} w-fit mb-4`}>
              {action.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{action.description}</p>
            <Button 
              className={`w-full bg-gradient-to-r ${action.gradient} hover:opacity-90 transition-opacity`}
              onClick={action.onClick}
            >
              {action.buttonText}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CallToActionCards; 