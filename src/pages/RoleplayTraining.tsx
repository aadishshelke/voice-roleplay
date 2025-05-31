import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ChatSection from '../components/ChatSection';
import FeedbackPanel from '../components/FeedbackPanel';

const scenarios = [
  {
    id: 1,
    title: 'Customer Service Call',
    description: 'Practice handling customer complaints and inquiries',
    initialMessage: 'Hello, I have a question about your service.',
    difficulty: 'Beginner',
    duration: '10 minutes'
  },
  {
    id: 2,
    title: 'Sales Pitch',
    description: 'Practice your sales presentation skills',
    initialMessage: 'Hi, I\'m interested in learning more about your product.',
    difficulty: 'Intermediate',
    duration: '15 minutes'
  },
  {
    id: 3,
    title: 'Job Interview',
    description: 'Practice common interview questions and responses',
    initialMessage: 'Hello, thank you for having me today.',
    difficulty: 'Advanced',
    duration: '20 minutes'
  }
];

const RoleplayTraining: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRecording, setIsRecording] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<any>(null);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    if (id === 'custom') {
      // Handle custom scenario
      const customScenario = location.state?.scenario;
      if (customScenario) {
        setCurrentScenario({
          id: 'custom',
          title: 'Custom Scenario',
          description: customScenario,
          initialMessage: customScenario,
          difficulty: 'Custom',
          duration: 'Flexible'
        });
      } else {
        navigate('/roleplay-practice');
      }
    } else {
      // Handle predefined scenarios
      const scenario = scenarios.find(s => s.id === Number(id));
      if (!scenario) {
        navigate('/roleplay-practice');
        return;
      }
      setCurrentScenario(scenario);
    }
  }, [id, navigate, location.state]);

  const [conversation, setConversation] = useState([
    {
      role: 'customer',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  useEffect(() => {
    if (currentScenario) {
      setConversation([
        {
          role: 'customer',
          text: currentScenario.initialMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [currentScenario]);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Add recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Add stop recording logic here
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setConversation(prev => [...prev, {
        role: 'partner',
        text: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentScenario) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">{currentScenario.title}</h1>
          <p className="text-gray-600 mt-1">{currentScenario.description}</p>
          {currentScenario.id === 'custom' && (
            <div className="mt-2 flex items-center gap-2">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Custom Scenario
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
            <div className="p-4">
              <ChatSection conversation={conversation} />
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send
                </button>
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {isRecording ? 'Stop' : 'Record'}
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Panel */}
          <div className="bg-white rounded-lg shadow-md">
            <FeedbackPanel
              metrics={{
                accuracy: 85,
                speed: 70,
                empathy: 90,
                confidence: 75
              }}
              feedback={{
                best: 'Good use of active listening',
                worst: 'Could improve response time'
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleplayTraining; 