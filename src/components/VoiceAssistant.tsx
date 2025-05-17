import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, MessageSquare, Volume2, Bot, Loader2, VolumeX, Volume } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { toast } from 'react-hot-toast';
import { isElevenLabsConfigured } from '../lib/env';

interface VoiceAssistantProps {
  onClose: () => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string }[]>([
    { type: 'ai', text: 'Hello! I\'m the QYGrowth AI Voice Assistant. How can I help you today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [volume, setVolume] = useState(1.0);
  const [muted, setMuted] = useState(false);

  const {
    transcript: webSpeechTranscript,
    listening: isWebSpeechListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const {
    speak,
    stop: stopSpeaking,
    isLoading: isLoadingTTS,
    isPlaying: isPlayingTTS,
    error: ttsError,
    setVolume: setTTSVolume
  } = useTextToSpeech();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("Your browser doesn't support speech recognition");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (ttsError) {
      console.error('Text-to-speech error:', ttsError);
      toast.error('Voice generation error. Using native browser speech instead.');
    }
  }, [ttsError]);

  useEffect(() => {
    if (webSpeechTranscript) {
      setTranscript(webSpeechTranscript);
    }
  }, [webSpeechTranscript]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      speakText('Hello! I\'m the QYGrowth AI Voice Assistant. How can I help you today?');
    }, 500);

    return () => {
      SpeechRecognition.stopListening();
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    setIsSpeaking(isPlayingTTS);
  }, [isPlayingTTS]);

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
    setIsListening(true);
    setTranscript('');
    try {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } catch (error) {
      console.error('Recognition start error', error);
      toast.error('Could not start speech recognition');
    }
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();

    if (transcript) {
      processUserInput(transcript);
      setTranscript('');
    }
  };

  const toggleMute = () => {
    if (muted) {
      setMuted(false);
      setVolume(1.0);
      setTTSVolume(1.0);
    } else {
      setMuted(true);
      setVolume(0);
      setTTSVolume(0);
      if (isSpeaking) {
        stopSpeaking();
      }
    }
  };

  const speakText = async (text: string) => {
    if (muted) {
      console.log('Audio is muted, not speaking:', text);
      return;
    }

    setIsSpeaking(true);

    console.log('Speaking text:', text.substring(0, 50) + '...');

    try {
      await speak(text);
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
      toast.error('Failed to generate speech. Please check console for details.');
    }
  };

  const getAIResponse = (userInput: string): Promise<string> => {
    setIsProcessing(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const lowercaseInput = userInput.toLowerCase();
        let response = '';

        if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
          response = "Hello! I'm the QYGrowth AI Voice Agent. I can help you learn about our voice technology services including inbound and outbound calling, SMS, and chat solutions. What would you like to know?";
        } 
        else if (lowercaseInput.includes('what') && (lowercaseInput.includes('do') || lowercaseInput.includes('service'))) {
          response = "We offer advanced AI Voice Agent solutions for businesses. This includes inbound call handling, outbound sales calls, SMS integration, and website chat capabilities. Our AI systems can handle customer inquiries, qualify leads, and book appointments 24/7 without human intervention.";
        }
        else if (lowercaseInput.includes('price') || lowercaseInput.includes('cost') || lowercaseInput.includes('quote')) {
          response = "Our AI Voice solutions start at $1,000 per month for basic configurations. We offer scalable pricing based on call volume and features needed. For a custom quote based on your specific business needs, I can connect you with our solutions team. Would you like me to arrange that?";
        }
        else if (lowercaseInput.includes('booking') || lowercaseInput.includes('schedule') || lowercaseInput.includes('appointment') || lowercaseInput.includes('call')) {
          response = "I'd be happy to schedule a strategy call with our team. They can provide a personalized demo of our AI voice system and discuss how it can help your business. Would you prefer a morning or afternoon appointment?";
        }
        else if (lowercaseInput.includes('morning')) {
          response = "Great! I've noted your preference for a morning call. Can I get your name and the best email to reach you for scheduling confirmation?";
        }
        else if (lowercaseInput.includes('afternoon') || lowercaseInput.includes('evening')) {
          response = "Perfect! I've noted your preference for an afternoon call. Can I get your name and the best email to reach you for scheduling confirmation?";
        }
        else if (lowercaseInput.includes('@') || lowercaseInput.includes('email')) {
          response = "Thank you! I've recorded your contact information. A member of our team will email you shortly with available time slots for your strategy call about our voice technology. Is there anything specific you'd like them to prepare for the demonstration?";
        }
        else if (lowercaseInput.includes('lead') || lowercaseInput.includes('generation')) {
          response = "Our Voice-powered Lead Generation system can qualify prospects, answer common questions, and book appointments automatically. It works through phone calls, SMS, and website chat, all using the same AI brain. Would you like to know more about how our voice technology handles lead qualification?";
        }
        else if (lowercaseInput.includes('how') && lowercaseInput.includes('work')) {
          response = "Our AI Voice system works by integrating with your phone system, allowing AI to handle inbound calls and make outbound calls. The technology understands natural language, maintains context throughout conversations, and can transfer to human agents when needed. It also integrates with SMS and chat for a unified communication experience. Would you like to see a demonstration?";
        }
        else if (lowercaseInput.includes('thank you') || lowercaseInput.includes('thanks')) {
          response = "You're welcome! It's been a pleasure demonstrating our voice technology today. Is there anything else you'd like to know about our voice services?";
        }
        else if (lowercaseInput.includes('no') && (lowercaseInput.includes('thank') || lowercaseInput.includes('that') || lowercaseInput.includes('all'))) {
          response = "Thank you for your interest in QYGrowth AI Voice solutions. We look forward to potentially working with you to transform your business communications. Have a great day!";
        }
        else if (lowercaseInput.includes('volume') || lowercaseInput.includes('can\'t hear')) {
          response = "I've adjusted the volume to maximum. Can you hear me better now? If you're still having trouble, please check your device's volume settings.";
        }
        else {
          response = "That's an interesting question about " + userInput.split(' ').slice(0, 3).join(' ') + "... Our AI Voice systems can handle a wide range of business needs including customer service, sales outreach, and lead qualification through voice, SMS, and chat. Would you like me to arrange a demonstration with our team for your specific requirements?";
        }

        setIsProcessing(false);
        resolve(response);
      }, 1500);
    });
  };

  const processUserInput = async (input: string) => {
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    
    const aiResponse = await getAIResponse(input);
    setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
    
    speakText(aiResponse);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-[#39FF14]/30 rounded-xl shadow-[0_0_30px_rgba(57,255,20,0.3)] w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-r from-black to-gray-900 p-4 flex justify-between items-center border-b border-[#39FF14]/20">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-[#39FF14]" />
            <h2 className="text-lg font-semibold text-white">QYGrowth Voice AI Assistant</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="rounded-full p-1 hover:bg-gray-800 transition-colors"
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="w-5 h-5 text-red-400" />
              ) : (
                <Volume className="w-5 h-5 text-green-400" />
              )}
            </button>
            <button 
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
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

        <div className="px-4 py-2 bg-black/70 border-t border-[#39FF14]/20 flex items-center">
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
            {isListening ? "Tap the microphone again when you're done speaking" : "Experience our premium voice technology powered by ElevenLabs"}
          </p>
        </div>
      </div>
    </div>
  );
};