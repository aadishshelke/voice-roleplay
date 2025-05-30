import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Paper, Grid, LinearProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const VoiceChatCoach = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isRecording]);

  const convertToWav = async (blob) => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const wavBlob = await audioBufferToWav(audioBuffer);
      return wavBlob;
    } catch (err) {
      console.error('Error converting to WAV:', err);
      throw new Error('Failed to convert audio format');
    }
  };

  const audioBufferToWav = async (buffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = buffer.length * blockAlign;
    const headerSize = 44;
    const totalSize = headerSize + dataSize;

    const arrayBuffer = new ArrayBuffer(totalSize);
    const view = new DataView(arrayBuffer);

    // RIFF identifier
    writeString(view, 0, 'RIFF');
    // RIFF chunk length
    view.setUint32(4, totalSize - 8, true);
    // RIFF type
    writeString(view, 8, 'WAVE');
    // format chunk identifier
    writeString(view, 12, 'fmt ');
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, format, true);
    // channel count
    view.setUint16(22, numChannels, true);
    // sample rate
    view.setUint32(24, sampleRate, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, byteRate, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, blockAlign, true);
    // bits per sample
    view.setUint16(34, bitDepth, true);
    // data chunk identifier
    writeString(view, 36, 'data');
    // data chunk length
    view.setUint32(40, dataSize, true);

    // Write the PCM samples
    const offset = 44;
    const channelData = [];
    for (let i = 0; i < numChannels; i++) {
      channelData.push(buffer.getChannelData(i));
    }

    let pos = 0;
    while (pos < buffer.length) {
      for (let i = 0; i < numChannels; i++) {
        const sample = Math.max(-1, Math.min(1, channelData[i][pos]));
        const value = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset + pos * blockAlign + i * bytesPerSample, value, true);
      }
      pos++;
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const startRecording = async () => {
    try {
      setError(null);
      setAnalysis(null);
      chunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1
        }
      });

      const mimeType = getSupportedMimeType();
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000
      });

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(audioBlob);
        await analyzeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to access microphone. Please ensure you have granted microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const getSupportedMimeType = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4',
      'audio/mpeg'
    ];
    return types.find(type => MediaRecorder.isTypeSupported(type)) || 'audio/webm';
  };

  const analyzeAudio = async (blob) => {
    try {
      setLoading(true);
      const wavBlob = await convertToWav(blob);
      const formData = new FormData();
      formData.append('file', wavBlob, 'recording.wav');

      // First analyze the audio
      const audioResponse = await fetch('/api/analyze-audio', {
        method: 'POST',
        body: formData,
      });

      if (!audioResponse.ok) {
        const errorData = await audioResponse.json();
        throw new Error(errorData.error || 'Failed to analyze audio');
      }

      const audioData = await audioResponse.json();
      if (audioData.error) {
        throw new Error(audioData.error);
      }

      // Then analyze selling skills
      const sellingSkillsResponse = await fetch('/api/analyze-selling-skill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audioFeatures: audioData.audio_features,
          voiceMetrics: audioData.voice_metrics
        })
      });

      if (!sellingSkillsResponse.ok) {
        const errorData = await sellingSkillsResponse.json();
        throw new Error(errorData.error || 'Failed to analyze selling skills');
      }

      const sellingSkillsData = await sellingSkillsResponse.json();
      
      // Combine the results
      setAnalysis({
        ...audioData,
        selling_skills: sellingSkillsData
      });
    } catch (err) {
      console.error('Error analyzing audio:', err);
      setError(err.message || 'Failed to analyze audio. Please try again.');
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      joy: '#4caf50',
      sadness: '#2196f3',
      anger: '#f44336',
      fear: '#9c27b0',
      surprise: '#ff9800',
      neutral: '#9e9e9e'
    };
    return colors[emotion?.toLowerCase()] || colors.neutral;
  };

  const getMetricColor = (value) => {
    if (!value) return '#9e9e9e';
    if (value >= 0.7) return '#4caf50';
    if (value >= 0.4) return '#ff9800';
    return '#f44336';
  };

  const renderAnalysis = () => {
    if (!analysis) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Transcript
              </Typography>
              <Typography variant="body1">
                {analysis.transcript || 'No transcript available'}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SentimentSatisfiedIcon sx={{ color: getEmotionColor(analysis.emotion?.emotion) }} />
                <Typography variant="h6">
                  Emotion Analysis
                </Typography>
              </Box>
              <Typography variant="body1">
                Emotion: {analysis.emotion?.emotion || 'Unknown'} 
                {analysis.emotion?.confidence && ` (${(analysis.emotion.confidence * 100).toFixed(1)}% confidence)`}
              </Typography>
              <Typography variant="body1">
                Sentiment: {analysis.sentiment?.sentiment || 'Unknown'}
                {analysis.sentiment?.confidence && ` (${(analysis.sentiment.confidence * 100).toFixed(1)}% confidence)`}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Voice Metrics
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <VolumeUpIcon />
                  <Typography variant="body2">Volume</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(analysis.voice_metrics?.volume || 0) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getMetricColor(analysis.voice_metrics?.volume)
                    }
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <SpeedIcon />
                  <Typography variant="body2">Pace</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(analysis.voice_metrics?.pace || 0) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getMetricColor(analysis.voice_metrics?.pace)
                    }
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AutoAwesomeIcon />
                  <Typography variant="body2">Clarity</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(analysis.voice_metrics?.clarity || 0) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getMetricColor(analysis.voice_metrics?.clarity)
                    }
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Selling Skills Analysis
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ThumbUpIcon sx={{ color: '#4caf50' }} />
                    <Typography variant="subtitle1">Strengths</Typography>
                  </Box>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    {analysis.selling_skills?.strengths?.map((strength, index) => (
                      <li key={index}>
                        <Typography variant="body1">{strength}</Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ThumbDownIcon sx={{ color: '#f44336' }} />
                    <Typography variant="subtitle1">Areas for Improvement</Typography>
                  </Box>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    {analysis.selling_skills?.weaknesses?.map((weakness, index) => (
                      <li key={index}>
                        <Typography variant="body1">{weakness}</Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Voice Chat Coach
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Record your voice to get feedback on your speaking style, emotion, and clarity.
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            color={isRecording ? 'error' : 'primary'}
            startIcon={isRecording ? <StopIcon /> : <MicIcon />}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          {isRecording && (
            <Typography variant="body1" color="text.secondary">
              Recording: {formatTime(recordingTime)}
            </Typography>
          )}
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={24} />
            <Typography>Analyzing your voice...</Typography>
          </Box>
        )}

        {renderAnalysis()}
      </Paper>
    </Box>
  );
};

export default VoiceChatCoach;