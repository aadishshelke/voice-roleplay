import React from 'react';
import VoiceChatCoach from './VoiceChatCoach';

export default function VoiceChatCoachSection() {
  return (
    <section className="voice-chat-coach-section bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Chat Coach</h1>
          <p className="text-gray-600">Practice your sales pitch and get instant AI feedback on your delivery</p>
        </div>
        <VoiceChatCoach />
      </div>
    </section>
  );
} 