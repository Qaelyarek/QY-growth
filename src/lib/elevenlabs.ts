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

export const initializeElevenLabs = () => {
  if (!isElevenLabsConfigured()) {
    console.warn('ElevenLabs API key is not set. Falling back to Web Speech API.');
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
          
          if (!response.ok) {
            throw new Error(`Failed to fetch voices: ${response.statusText}`);
          }
          
          return response.json();
        }
      },
      textToSpeech: {
        async convert(voiceId: string, options: {
          text: string;
          model_id: string;
          voice_settings: VoiceSettings;
        }) {
          console.log('Converting text to speech:', options.text);
          
          const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': env.ELEVENLABS_API_KEY
            },
            body: JSON.stringify(options)
          });
          
          console.log('ElevenLabs API Response:', response);
          
          if (!response.ok) {
            throw new Error(`Failed to generate speech: ${response.statusText}`);
          }
          
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

export const generateSpeech = async (text: string, voiceId: string): Promise<ArrayBuffer | null> => {
  const client = initializeElevenLabs();
  if (!client) return null;
  
  try {
    console.log('Generating speech for text:', text);
    console.log('Using voice ID:', voiceId);
    
    const audio = await client.textToSpeech.convert(voiceId, {
      text,
      model_id: 'eleven_turbo_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    });
    
    console.log('Speech generation successful');
    return audio;
  } catch (error) {
    console.error('Failed to generate speech:', error);
    return null;
  }
};