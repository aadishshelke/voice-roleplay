export interface AudioFeatures {
  mfcc: number[];
  spectral_centroid: number;
  spectral_bandwidth: number;
  spectral_rolloff: number;
  zero_crossing_rate: number;
  rms: number;
  tempo: number;
  onset_strength: number;
  pitch: number;
  duration: number;
}

export interface VoiceMetrics {
  volume: number;
  pitch_stability: number;
  pace: number;
  clarity: number;
}

export interface EmotionAnalysis {
  emotion: string;
  confidence: number;
}

export interface SentimentAnalysis {
  sentiment: string;
  confidence: number;
}

export interface AudioAnalysisResult {
  transcript: string;
  emotion: EmotionAnalysis;
  sentiment: SentimentAnalysis;
  voice_metrics: VoiceMetrics;
  audio_features: AudioFeatures;
  error?: string;
  message?: string;
}

export interface SellingSkillAnalysis {
  strengths: string[];
  weaknesses: string[];
}

export interface SellingSkillRequest {
  audioFeatures: AudioFeatures;
  voiceMetrics: VoiceMetrics;
}

const API_BASE_URL = 'http://localhost:8000';

// Helper function to handle API errors
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `HTTP error! status: ${response.status}`;
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.detail || errorData.message || errorMessage;
  } catch (jsonError) {
    // If we can't parse the error response, use the generic message
    console.warn('Could not parse error response:', jsonError);
  }
  
  throw new Error(errorMessage);
};

// Helper function to validate response data
const validateSellingSkillResponse = (data: any): SellingSkillAnalysis => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response format');
  }

  const { strengths, weaknesses } = data;

  if (!Array.isArray(strengths) || strengths.length < 2) {
    throw new Error('Invalid strengths data - expected array with at least 2 items');
  }

  if (!Array.isArray(weaknesses) || weaknesses.length < 2) {
    throw new Error('Invalid weaknesses data - expected array with at least 2 items');
  }

  // Ensure all items are strings and filter out empty ones
  const validStrengths = strengths
    .map(s => String(s).trim())
    .filter(s => s.length > 0)
    .slice(0, 2);

  const validWeaknesses = weaknesses
    .map(w => String(w).trim())
    .filter(w => w.length > 0)
    .slice(0, 2);

  if (validStrengths.length < 2 || validWeaknesses.length < 2) {
    throw new Error('Insufficient valid strengths or weaknesses');
  }

  return {
    strengths: validStrengths,
    weaknesses: validWeaknesses
  };
};

export const analyzeSellingSkill = async (
  audioFeatures: AudioFeatures,
  voiceMetrics: VoiceMetrics
): Promise<SellingSkillAnalysis> => {
  try {
    console.log('Sending request to analyze selling skill...');
    console.log('Audio Features:', JSON.stringify(audioFeatures, null, 2));
    console.log('Voice Metrics:', JSON.stringify(voiceMetrics, null, 2));

    const response = await fetch(`${API_BASE_URL}/api/analyze-selling-skill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        audioFeatures,
        voiceMetrics
      })
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    const data = await response.json();
    console.log('Raw API response:', data);

    const validatedData = validateSellingSkillResponse(data);
    console.log('Validated response:', validatedData);

    return validatedData;

  } catch (error) {
    console.error('Error in analyzeSellingSkill:', error);
    
    // Provide a fallback response for better user experience
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unknown error occurred during analysis');
    }
  }
};

export const analyzeAudio = async (audioFile: File | Blob): Promise<AudioAnalysisResult> => {
  try {
    console.log('Analyzing audio file...');
    
    const formData = new FormData();
    formData.append('file', audioFile);

    const response = await fetch(`${API_BASE_URL}/api/analyze-audio`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    const data = await response.json();
    console.log('Audio analysis response:', data);

    // Handle error responses that still return 200 status
    if (data.error) {
      throw new Error(data.message || data.error);
    }

    return data as AudioAnalysisResult;

  } catch (error) {
    console.error('Error in analyzeAudio:', error);
    throw error;
  }
};

// Health check function
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.status === 'healthy';

  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

// Combined analysis function for convenience
export const performCompleteVoiceAnalysis = async (audioFile: File | Blob): Promise<{
  audioAnalysis: AudioAnalysisResult;
  skillAnalysis: SellingSkillAnalysis;
}> => {
  try {
    // First analyze the audio
    const audioAnalysis = await analyzeAudio(audioFile);
    
    // Then analyze selling skills
    const skillAnalysis = await analyzeSellingSkill(
      audioAnalysis.audio_features,
      audioAnalysis.voice_metrics
    );

    return {
      audioAnalysis,
      skillAnalysis
    };

  } catch (error) {
    console.error('Error in complete voice analysis:', error);
    throw error;
  }
};

// Utility function to format confidence percentages
export const formatConfidence = (confidence: number): string => {
  return `${(confidence * 100).toFixed(1)}%`;
};

// Utility function to format voice metrics for display
export const formatVoiceMetrics = (metrics: VoiceMetrics): Array<{
  name: string;
  value: number;
  percentage: string;
  color: string;
}> => {
  const colorMap: Record<string, string> = {
    volume: 'bg-blue-500',
    pitch_stability: 'bg-green-500',
    pace: 'bg-yellow-500',
    clarity: 'bg-purple-500'
  };

  return Object.entries(metrics).map(([key, value]) => ({
    name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value,
    percentage: `${(value * 100).toFixed(1)}%`,
    color: colorMap[key] || 'bg-gray-500'
  }));
}; 