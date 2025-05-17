import { elevenlabs as ElevenLabsClient } from 'elevenlabs';
import { env, isElevenLabsConfigured } from './env';

// Initialize the ElevenLabs client with the API key
export const initializeElevenLabs = () => {
  if (!isElevenLabsConfigured()) {
    console.error('ElevenLabs API key is not set. Voice features will not work properly.');
    return null;
  }
  
  try {
    const client = new ElevenLabsClient({
      apiKey: env.ELEVENLABS_API_KEY
    });
    
    return client;
  } catch (error) {
    console.error('Failed to initialize ElevenLabs client:', error);
    return null;
  }
};

// Get available voices
export const getVoices = async () => {
  const client = initializeElevenLabs();
  if (!client) return [];
  
  try {
    const voices = await client.voices.getAll();
    return voices;
  } catch (error) {
    console.error('Failed to fetch voices:', error);
    return [];
  }
};

// Helper for generating speech from text
export const generateSpeech = async (text: string, voiceId: string) => {
  const client = initializeElevenLabs();
  if (!client) return null;
  
  try {
    const audio = await client.textToSpeech.convert(voiceId, {
      text,
      model_id: 'eleven_turbo_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    });
    
    return audio;
  } catch (error) {
    console.error('Failed to generate speech:', error);
    return null;
  }
};