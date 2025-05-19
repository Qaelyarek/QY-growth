import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, MessageSquare, Volume2, Bot, Loader2 } from 'lucide-react';
import { generateSpeech } from '../lib/elevenlabs';
import { generateResponse } from '../lib/openai';
import { VoiceVisualization } from './ui/voice-visualization';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceAssistantProps {
  onClose: () => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string }[]>([
    { type: 'ai', text: 'Hello! I\'m the QYGrowth AI Voice Assistant. How can I help you today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setTimeout(() => {
      speakText('Hello! I\'m the QYGrowth AI Voice Assistant. How can I help you today?');
    }, 500);

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Browser doesn\'t support speech recognition.');
      return;
    }
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    if (transcript) {
      processUserInput(transcript);
      resetTranscript();
    }
  };

  const speakText = async (text: string) => {
    setIsSpeaking(true);

    try {
      const audio = await generateSpeech(text, 'agent_01jvepganyex89bnx4dcaf7qtg');
      
      if (audio) {
        const audioBlob = new Blob([audio], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);
        
        // Create audio context for volume analysis
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioElement);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setVolume(average / 255);
          if (isSpeaking) {
            requestAnimationFrame(updateVolume);
          }
        };
        
        audioElement.onplay = () => {
          updateVolume();
        };
        
        audioElement.onended = () => {
          setIsSpeaking(false);
          setVolume(0.5);
          URL.revokeObjectURL(audioUrl);
          audioContext.close();
        };
        
        await audioElement.play();
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        
        let voices = speechSynthesis.getVoices();
        if (voices.length === 0) {
          await new Promise<void>(resolve => {
            speechSynthesis.onvoiceschanged = () => {
              voices = speechSynthesis.getVoices();
              resolve();
            };
          });
        }
        
        const femaleVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('Samantha') || 
          voice.name.includes('Google UK English Female')
        );
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onstart = () => {
          setVolume(0.7);
        };
        
        utterance.onend = () => {
          setIsSpeaking(false);
          setVolume(0.5);
        };
        
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
      setVolume(0.5);
    }
  };

  const processUserInput = async (input: string) => {
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setIsProcessing(true);
    
    try {
      const aiResponse = await generateResponse(input);
      setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      await speakText(aiResponse);
    } catch (error) {
      console.error('Error processing user input:', error);
      const errorMessage = "I apologize, but I'm having trouble processing your request. Please try again.";
      setMessages(prev => [...prev, { type: 'ai', text: errorMessage }]);
      await speakText(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-[#39FF14]/30 rounded-xl shadow-[0_0_30px_rgba(57,255,20,0.3)] w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-r from-black to-gray-900 p-4 flex justify-between items-center border-b border-[#39FF14]/20">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-[#39FF14]" />
            <h2 className="text-lg font-semibold text-white">QYGrowth Voice AI Assistant</h2>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {showWelcome && (
          <div 
            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10 animate-fadeOut"
            onAnimationEnd={() => setShowWelcome(false)}
          >
            <Bot className="w-16 h-16 text-[#39FF14] mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Voice Assistant Activated</h2>
            <p className="text-gray-400 text-center max-w-md">
              Speaking with you now... Please allow microphone access if prompted.
            </p>
          </div>
        )}

        <div className="p-4 h-80 overflow-y-auto bg-gray-900/50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600/20 border border-blue-500/30 text-white' 
                      : 'bg-[#39FF14]/10 border border-[#39FF14]/30 text-white'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center mb-1">
                      <Bot className="w-4 h-4 text-[#39FF14] mr-2" />
                      <span className="text-xs font-semibold text-[#39FF14]">Voice AI</span>
                    </div>
                  )}
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="px-4 py-2 bg-black/70 border-t border-[#39FF14]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isProcessing ? (
                <div className="flex items-center text-blue-400 text-sm">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </div>
              ) : isSpeaking ? (
                <div className="flex items-center text-[#39FF14] text-sm">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Speaking...
                </div>
              ) : isListening ? (
                <div className="flex items-center text-red-400 text-sm">
                  <Mic className="w-4 h-4 mr-2 animate-pulse" />
                  Listening...
                </div>
              ) : (
                <div className="flex items-center text-gray-400 text-sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ready
                </div>
              )}
            </div>
            <VoiceVisualization 
              isActive={isSpeaking || isListening} 
              volume={volume}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-900/30 border-t border-gray-800">
          <div className="flex items-center">
            <div className="flex-1 border border-gray-700 rounded-lg bg-black/50 p-3 relative">
              {transcript ? (
                <p className="text-white">{transcript}</p>
              ) : (
                <p className="text-gray-500">
                  {isListening ? "I'm listening..." : "Click the microphone to speak"}
                </p>
              )}
            </div>
            <button
              onClick={toggleListening}
              className={`ml-2 p-3 rounded-full ${
                isListening 
                  ? 'bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30' 
                  : 'bg-[#39FF14]/20 border border-[#39FF14]/50 text-[#39FF14] hover:bg-[#39FF14]/30'
              } transition-all`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {isListening ? "Tap the microphone again when you're done speaking" : "Experience our premium voice technology"}
          </p>
        </div>
      </div>
    </div>
  );
};