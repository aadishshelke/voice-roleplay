import React, { useState } from 'react';
import { FileText, Star, Clock, Eye, Play, Pause } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VoiceAnalysis } from '@/components/VoiceAnalysis';

export const SavedScripts: React.FC = () => {
  const [speaking, setSpeaking] = React.useState<number | null>(null);
  const [practicing, setPracticing] = useState<number | null>(null);

  const playScript = (id: number, content: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (speaking === id) {
      setSpeaking(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(content);
    
    // Configure the voice settings
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    
    // Try to use a professional-sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Daniel') || // Microsoft Daniel
      voice.name.includes('Alex') ||   // macOS Alex
      voice.name.includes('David')     // Windows David
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Handle speech end
    utterance.onend = () => {
      setSpeaking(null);
    };

    setSpeaking(id);
    window.speechSynthesis.speak(utterance);
  };

  const startPractice = (id: number) => {
    if (practicing === id) {
      setPracticing(null);
    } else {
      setPracticing(id);
      // Stop any ongoing playback
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(null);
      }
    }
  };

  const scripts = [
    {
      id: 1,
      title: 'Life Insurance Opening',
      category: 'Opening Statements',
      content: 'Hello [Name], I hope you\'re having a great day. I\'m calling to discuss how we can help protect your family\'s financial future with our life insurance solutions...',
      lastUsed: '2 days ago',
      useCount: 15,
      rating: 4.5
    },
    {
      id: 2,
      title: 'Price Objection Response',
      category: 'Objection Handling',
      content: 'I understand that budget is a concern for you. Let me break down the value you\'re getting and show you how this investment pays for itself...',
      lastUsed: '1 week ago',
      useCount: 8,
      rating: 4.8
    },
    {
      id: 3,
      title: 'Follow-up Call Script',
      category: 'Follow-up',
      content: 'Hi [Name], I wanted to follow up on our conversation about your insurance needs. Have you had a chance to think about what we discussed?',
      lastUsed: '3 days ago',
      useCount: 12,
      rating: 4.2
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Scripts</h1>
          <p className="text-gray-600 mt-1">Your collection of proven sales scripts and conversation starters.</p>
        </div>
        <Button>Add New Script</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-gray-600">Total Scripts</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">35</p>
            <p className="text-gray-600">Total Uses</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4.5</p>
            <p className="text-gray-600">Avg Rating</p>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {scripts.map((script) => (
          <div key={script.id}>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{script.title}</h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mt-1">
                    {script.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= script.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({script.rating})</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{script.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Last used {script.lastUsed}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    Used {script.useCount} times
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => playScript(script.id, script.content)}
                    className="flex items-center space-x-1"
                  >
                    {speaking === script.id ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Listen</span>
                      </>
                    )}
                  </Button>
                  <Button 
                    variant={practicing === script.id ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => startPractice(script.id)}
                  >
                    Practice
                  </Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button size="sm">Use Script</Button>
                </div>
              </div>
            </Card>
            {practicing === script.id && (
              <VoiceAnalysis 
                scriptContent={script.content}
                onAnalysisComplete={(analysis) => {
                  console.log('Analysis complete:', analysis);
                  // Here you could save the analysis results or update the UI
                }}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="bg-blue-50 p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Script Writing Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Keep it Natural</h4>
            <p className="text-blue-700 text-sm">Write scripts that sound conversational, not robotic. Practice them until they feel natural.</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Personalize</h4>
            <p className="text-blue-700 text-sm">Use placeholders like [Name] and [Company] to make scripts feel personalized for each customer.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SavedScripts;