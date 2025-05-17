import { Voice, VoiceSettings } from 'elevenlabs-node';
import { env, isElevenLabsConfigured } from './env';

interface ElevenLabsClient {
  voices: {
    getAll(): Promise<Voice[]>;
  };
  textToSpeech: {
    convert(voiceId: string, options: {
      text: string;
      model_id: string;
      voice_settings: VoiceSettings;
    }): Promise<ArrayBuffer>;
  };
}

// Initialize the ElevenLabs client with the API key
export const initializeElevenLabs = () => {
  if (!isElevenLabsConfigured()) {
    console.error('ElevenLabs API key is not set. Voice features will not work properly.');
    return null;
  }
  
  try {
    const client = {
      voices: {
        async getAll() {
          const response = await fetch('https://api.elevenlabs.io/v1/voices', {
            headers: {
              'xi-api-key': env.ELEVENLABS_API_KEY
            }
          });
          return response.json();
        }
      },
      textToSpeech: {
        async convert(voiceId: string, options: {
          text: string;
          model_id: string;
          voice_settings: VoiceSettings;
        }) {
          const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': env.ELEVENLABS_API_KEY
            },
            body: JSON.stringify(options)
          });
          return response.arrayBuffer();
        }
      }
    };
    
    return client as ElevenLabsClient;
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

export { generateSpeech }