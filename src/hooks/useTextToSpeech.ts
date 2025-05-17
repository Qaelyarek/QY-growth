import { useState, useEffect, useCallback } from 'react';
import { isElevenLabsConfigured, env } from '../lib/env';

interface SpeechOptions {
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
  modelId?: string;
}

interface UseTextToSpeechReturn {
  speak: (text: string, options?: SpeechOptions) => Promise<void>;
  stop: () => void;
  isLoading: boolean;
  isPlaying: boolean;
  error: Error | null;
  setVolume: (volume: number) => void;
}

const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel voice
const DEFAULT_MODEL = 'eleven_turbo_v2';

export const useTextToSpeech = (initialOptions?: SpeechOptions): UseTextToSpeechReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1.0);

  useEffect(() => {
    const audio = new Audio();
    audio.onended = () => setIsPlaying(false);
    audio.volume = volume;
    setAudioElement(audio);

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume;
    }
  }, [volume, audioElement]);

  const stop = useCallback(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audioElement]);

  const fallbackToWebSpeech = useCallback((text: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Get available voices and try to find a female voice
        const voices = synth.getVoices();
        const femaleVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('Samantha') || 
          voice.name.includes('Google UK English Female')
        );
        
        if (femaleVoice) utterance.voice = femaleVoice;
        
        utterance.volume = volume;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          setIsPlaying(false);
          resolve();
        };
        
        utterance.onerror = (event) => {
          setIsPlaying(false);
          reject(new Error(`Speech synthesis error: ${event.error}`));
        };
        
        // Cancel any ongoing speech before starting new one
        if (synth.speaking) {
          synth.cancel();
        }
        
        synth.speak(utterance);
        setIsPlaying(true);
      } catch (err) {
        setIsPlaying(false);
        console.error('Web Speech API error:', err);
        reject(err);
      }
    });
  }, [volume]);

  const speak = useCallback(async (text: string, options?: SpeechOptions) => {
    if (!text) return;
    
    try {
      setError(null);
      
      if (isPlaying) {
        stop();
      }
      
      // Check if ElevenLabs is configured, otherwise fallback to Web Speech API
      if (!isElevenLabsConfigured()) {
        console.log('ElevenLabs not configured, falling back to Web Speech API');
        return fallbackToWebSpeech(text);
      }
      
      setIsLoading(true);
      
      // Direct API call to ElevenLabs
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + (options?.voiceId || DEFAULT_VOICE_ID), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: options?.modelId || DEFAULT_MODEL,
          voice_settings: {
            stability: options?.stability || 0.5,
            similarity_boost: options?.similarityBoost || 0.75
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('TTS API error:', { status: response.status, data: errorData });
        throw new Error(`TTS API error: ${response.status} ${JSON.stringify(errorData)}`);
      }
      
      const audioBlob = await response.blob();
      const audioURL = URL.createObjectURL(audioBlob);
      
      if (audioElement) {
        audioElement.src = audioURL;
        audioElement.volume = volume;
        
        audioElement.onplay = () => {
          setIsPlaying(true);
          console.log('Audio started playing', { volume: audioElement.volume });
        };
        
        audioElement.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioURL);
          console.log('Audio playback completed');
        };
        
        audioElement.onerror = (e) => {
          const error = new Error(`Audio playback error: ${e}`);
          console.error(error);
          setError(error);
          setIsPlaying(false);
          URL.revokeObjectURL(audioURL);
        };
        
        try {
          await audioElement.play();
        } catch (playError) {
          console.error('Audio playback failed:', playError);
          throw playError;
        }
      } else {
        throw new Error('Audio element not initialized');
      }
    } catch (err) {
      console.error('Text-to-speech error:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Fallback to Web Speech API if ElevenLabs fails
      return fallbackToWebSpeech(text);
    } finally {
      setIsLoading(false);
    }
  }, [audioElement, fallbackToWebSpeech, isPlaying, stop, volume]);

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
    error,
    setVolume
  };
};