import React from 'react';

interface Message {
  role: string;
  text: string;
  audio_url?: string;
  timestamp: string;
}

interface ChatSectionProps {
  conversation: Message[];
}

const ChatSection: React.FC<ChatSectionProps> = ({ conversation }) => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {conversation.map((message, index) => (
        <div key={index} className={`flex ${message.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
          <div className={`max-w-xs p-3 rounded-lg ${message.role === 'customer' ? 'bg-blue-100' : 'bg-green-100'}`}>
            <p className="text-sm">{message.text}</p>
            <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSection; 