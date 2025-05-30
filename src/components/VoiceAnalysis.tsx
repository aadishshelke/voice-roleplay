import React, { useState, useRef } from 'react';
import { Mic, Square, BarChart2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VoiceAnalysisProps {
  scriptContent: string;
  onAnalysisComplete?: (analysis: VoiceAnalysisResult) => void;
}

interface VoiceAnalysisResult {
  overallScore: number;
  feedback: string;
  sellingSkills: { strengths: string[]; weaknesses: string[] };
}

export const VoiceAnalysis: React.FC<VoiceAnalysisProps> = ({ scriptContent, onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<VoiceAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const cleanupAudio = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const calculateAudioFeatures = (audioData: Float32Array, sampleRate: number) => {
    // Calculate average amplitude
    const amplitudes = audioData.map(Math.abs);
    const averageAmplitude = amplitudes.reduce((sum, val) => sum + val, 0) / amplitudes.length;

    // Calculate peak frequency using zero-crossing rate
    const zeroCrossings = audioData.slice(1).reduce((count, val, i) => {
      return count + (Math.sign(val) !== Math.sign(audioData[i]) ? 1 : 0);
    }, 0);
    const peakFrequency = (zeroCrossings * sampleRate) / (2 * audioData.length);

    // Calculate speech rate
    const frameSize = Math.floor(sampleRate * 0.025);
    let syllableCount = 0;
    for (let i = 0; i < audioData.length - frameSize; i += frameSize) {
      const frame = audioData.slice(i, i + frameSize);
      const energy = frame.reduce((sum, val) => sum + val * val, 0);
      if (energy > 0.01) syllableCount++;
    }
    const speechRate = (syllableCount * 4) / (audioData.length / sampleRate);

    // Calculate volume variation
    const volumeFrames = [];
    for (let i = 0; i < audioData.length; i += frameSize) {
      const frame = audioData.slice(i, i + frameSize);
      const rms = Math.sqrt(frame.reduce((sum, val) => sum + val * val, 0) / frame.length);
      volumeFrames.push(rms);
    }
    const avgVolume = volumeFrames.reduce((sum, val) => sum + val, 0) / volumeFrames.length;
    const volumeVariation = volumeFrames.reduce((sum, val) => sum + Math.pow(val - avgVolume, 2), 0) / volumeFrames.length;

    return {
      clarity: Math.min(100, (1 - volumeVariation * 10) * 100),
      energy: Math.min(100, averageAmplitude * 200),
      pace: Math.min(100, speechRate * 25),
      pitch: Math.min(100, (peakFrequency / 400) * 100),
      volume: Math.min(100, averageAmplitude * 300)
    };
  };

  const generateFeedback = (metrics: Record<string, number>): VoiceAnalysisResult => {
    // Calculate weighted score
    const weights = {
      clarity: 0.25,
      energy: 0.2,
      pace: 0.25,
      pitch: 0.15,
      volume: 0.15
    };

    const overallScore = Math.round(
      Object.entries(metrics).reduce((score, [key, value]) => {
        return score + (value * (weights as any)[key]);
      }, 0) * 100 // Scale score to 0-100
    );

    // Generate general feedback based on overall score
    let feedback = '';
    if (overallScore >= 90) {
      feedback = "Excellent delivery! Your speech is clear, well-paced, and engaging.";
    } else if (overallScore >= 80) {
      feedback = "Very good! Your delivery is strong with room for minor improvements.";
    } else if (overallScore >= 70) {
      feedback = "Good effort! Focus on maintaining consistent volume and pace.";
    } else if (overallScore >= 60) {
      feedback = "Fair delivery. Try to speak more clearly and with more energy.";
    } else {
      feedback = "Keep practicing! Focus on speaking clearly and confidently.";
    }

    // Generate specific strengths and weaknesses based on metrics
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (metrics.clarity >= 70) strengths.push("Clear pronunciation and diction.");
    else weaknesses.push("Work on speaking more distinctly for better clarity.");

    if (metrics.energy >= 70) strengths.push("Good vocal energy and enthusiasm.");
    else weaknesses.push("Try to inject more energy into your delivery.");

    if (metrics.pace >= 40 && metrics.pace <= 90) strengths.push("Effective speaking pace.");
    else if (metrics.pace < 40) weaknesses.push("Your pace might be too slow.");
    else weaknesses.push("Your pace might be too fast.");

    // Add more specific feedback based on other metrics if needed

    return {
      overallScore,
      feedback,
      sellingSkills: { strengths, weaknesses }
    };
  };

  const startRecording = async () => {
    try {
      setError(null);
      setAnalysis(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      sourceNodeRef.current.connect(analyserRef.current);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        await analyzeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
        cleanupAudio();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsAnalyzing(false);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Could not access microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsAnalyzing(true);
    }
  };

  const analyzeAudio = async (audioBlob: Blob) => {
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const audioData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;

      const metrics = calculateAudioFeatures(audioData, sampleRate);
      const result = generateFeedback(metrics);

      setAnalysis(result);
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }

      audioContext.close();
    } catch (error) {
      console.error('Error analyzing audio:', error);
      setError('Failed to analyze audio');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-emerald-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  React.useEffect(() => {
    return () => {
      cleanupAudio();
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <Card className="p-6 mt-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Practice Mode</h3>
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "default"}
            className="flex items-center space-x-2"
            disabled={isAnalyzing}
          >
            {isRecording ? (
              <>
                <Square className="w-4 h-4" />
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Start Recording</span>
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isAnalyzing && (
          <div className="text-center py-4">
            <BarChart2 className="w-6 h-6 animate-pulse mx-auto mb-2" />
            <p className="text-sm text-gray-600">Analyzing your recording...</p>
          </div>
        )}

        {analysis && !isAnalyzing && (
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-2">
                <span className={getScoreColor(analysis.overallScore)}>
                  {analysis.overallScore}%
                </span>
              </h4>
              <Progress 
                value={analysis.overallScore} 
                className="h-2 w-full max-w-md mx-auto mb-4" 
              />
              <p className="text-gray-700">{analysis.feedback}</p>
            </div>

            {/* Strengths and Weaknesses Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h5 className="text-lg font-semibold mb-2 text-green-700">Strengths</h5>
                <ul className="list-inside space-y-1 text-gray-700" style={{ listStyleType: 'disc', paddingLeft: '1.5em' }}>
                  {analysis.sellingSkills.strengths.map((strength, index) => (
                    <li key={index}>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-2 text-red-700">Areas for Improvement</h5>
                <ul className="list-inside space-y-1 text-gray-700" style={{ listStyleType: 'disc', paddingLeft: '1.5em' }}>
                  {analysis.sellingSkills.weaknesses.map((weakness, index) => (
                    <li key={index}>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};