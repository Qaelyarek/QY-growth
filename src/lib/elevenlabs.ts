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
          console.log('Converting text to speech via Edge Function');
          
          const response = await fetch(`${env.SUPABASE_URL}/functions/v1/tts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
              text: options.text,
              voice_id: voiceId,
              model_id: options.model_id,
              voice_settings: options.voice_settings
            })
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('TTS Edge Function error:', errorText);
            throw new Error(`Failed to generate speech: ${response.statusText}\nDetails: ${errorText}`);
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
  console.log('Initializing speech generation...');
  console.log('API Key present:', !!env.ELEVENLABS_API_KEY);
  
  const client = initializeElevenLabs();
  if (!client) {
    console.warn('ElevenLabs client initialization failed');
    return null;
  }
  
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