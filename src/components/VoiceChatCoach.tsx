import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Play, Square } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const VoiceChatCoach: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Voice Chat Coach</h1>
        <p className="text-gray-600 mt-1">Practice your speaking skills with AI-powered voice coaching.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Practice Session</h3>
          
          <div className="text-center py-8">
            <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-200 ${
              isRecording ? 'bg-red-100 animate-pulse' : 'bg-blue-100'
            }`}>
              {isRecording ? 
                <MicOff className="w-10 h-10 text-red-600" /> : 
                <Mic className="w-10 h-10 text-blue-600" />
              }
            </div>
            
            <Button
              onClick={() => setIsRecording(!isRecording)}
              variant={isRecording ? "destructive" : "default"}
              className="w-full"
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            
            <p className="text-gray-600 mt-4">
              {isRecording ? 'Recording in progress...' : 'Click to start practicing your pitch'}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Feedback</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Clear pronunciation and pace</li>
                <li>• Confident tone throughout</li>
                <li>• Good use of pauses</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">Areas for Improvement</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Vary your intonation more</li>
                <li>• Include more customer benefits</li>
                <li>• Practice smoother transitions</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Scripts</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Opening Statement</h4>
            <p className="text-gray-600 text-sm mb-3">
              "Hello [Name], I'm calling to discuss how our insurance solutions can protect what matters most to you and your family."
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Play className="w-3 h-3 mr-1" />
                Listen
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Mic className="w-3 h-3 mr-1" />
                Practice
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Objection Response</h4>
            <p className="text-gray-600 text-sm mb-3">
              "I understand your concern about cost. Let me show you how this investment protects your financial future..."
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Play className="w-3 h-3 mr-1" />
                Listen
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Mic className="w-3 h-3 mr-1" />
                Practice
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VoiceChatCoach; 