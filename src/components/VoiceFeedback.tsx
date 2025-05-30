import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  Paper, 
  Stack, 
  LinearProgress 
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { 
  analyzeAudio, 
  analyzeSellingSkill, 
  performCompleteVoiceAnalysis,
  formatConfidence,
  formatVoiceMetrics,
  type AudioAnalysisResult,
  type SellingSkillAnalysis
} from '@/api/sellingSkill';

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('VoiceFeedback Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-600 font-semibold">Something went wrong</h2>
          <p className="text-red-500 mt-2">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const VoiceFeedback: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{
    audio: AudioAnalysisResult | null;
    skill: SellingSkillAnalysis | null;
  }>({
    audio: null,
    skill: null
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      setError(null);
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError('Failed to start recording. Please check microphone permissions.');
      console.error('Recording error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      analyzeRecording();
    }
  };

  const analyzeRecording = async () => {
    if (audioChunksRef.current.length === 0) {
      setError('No audio data to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const result = await performCompleteVoiceAnalysis(audioBlob);
      
      setAnalysis({
        audio: result.audioAnalysis,
        skill: result.skillAnalysis
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze recording');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const renderMetrics = () => {
    if (!analysis.audio?.voice_metrics) return null;

    const metrics = formatVoiceMetrics(analysis.audio.voice_metrics);
    
    return (
      <Box sx={{ mt: 2 }}>
        {metrics.map((metric) => (
          <Box key={metric.name} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{metric.name}</Typography>
              <Typography variant="body2">{metric.percentage}</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={metric.value * 100} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: metric.color.replace('bg-', '')
                }
              }} 
            />
          </Box>
        ))}
      </Box>
    );
  };

  const renderAnalysis = () => {
    if (!analysis.audio || !analysis.skill) return null;

    return (
      <Stack spacing={3} sx={{ mt: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Voice Analysis
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Emotion
            </Typography>
            <Typography>
              {analysis.audio.emotion.emotion} ({formatConfidence(analysis.audio.emotion.confidence)})
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Sentiment
            </Typography>
            <Typography>
              {analysis.audio.sentiment.sentiment} ({formatConfidence(analysis.audio.sentiment.confidence)})
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Voice Metrics
            </Typography>
            {renderMetrics()}
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Selling Skills Analysis
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Strengths
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {analysis.skill.strengths.map((strength, index) => (
                <li key={index}>
                  <Typography>{strength}</Typography>
                </li>
              ))}
            </ul>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Areas for Improvement
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {analysis.skill.weaknesses.map((weakness, index) => (
                <li key={index}>
                  <Typography>{weakness}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Paper>
      </Stack>
    );
  };

  return (
    <ErrorBoundary>
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isAnalyzing}
              startIcon={isRecording ? <StopIcon /> : isAnalyzing ? <CircularProgress size={20} /> : <MicIcon />}
              sx={{ minWidth: 200 }}
            >
              {isRecording ? 'Stop Recording' : isAnalyzing ? 'Analyzing...' : 'Start Recording'}
            </Button>

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Box>
        </Paper>

        {renderAnalysis()}
      </Box>
    </ErrorBoundary>
  );
};

export default VoiceFeedback; 