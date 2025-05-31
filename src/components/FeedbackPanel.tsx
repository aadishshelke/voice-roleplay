import React from 'react';

interface Metrics {
  accuracy: number;
  speed: number;
  empathy: number;
  confidence: number;
}

interface Feedback {
  best: string;
  worst: string;
}

interface FeedbackPanelProps {
  metrics: Metrics;
  feedback: Feedback;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ metrics, feedback }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold">Accuracy: {metrics.accuracy}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${metrics.accuracy}%` }}></div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Speed: {metrics.speed}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${metrics.speed}%` }}></div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Empathy: {metrics.empathy}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: `${metrics.empathy}%` }}></div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Confidence: {metrics.confidence}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${metrics.confidence}%` }}></div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Feedback & Suggestions</h3>
        <p className="text-sm">Best: {feedback.best}</p>
        <p className="text-sm">Worst: {feedback.worst}</p>
      </div>
    </div>
  );
};

export default FeedbackPanel; 