import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Heart } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm here to listen and support you. How are you feeling today? Remember, I'm not a therapist, but I'm here to help you process your thoughts and feelings. If you're in crisis or having thoughts of self-harm, please reach out to a trusted adult or call a crisis hotline immediately.",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simple emotion detection
  const detectEmotion = (text: string): string => {
    const anxietyKeywords = ['anxious', 'worried', 'stress', 'panic', 'nervous', 'overwhelmed'];
    const sadnessKeywords = ['sad', 'depressed', 'lonely', 'hopeless', 'cry', 'upset'];
    const angerKeywords = ['angry', 'mad', 'frustrated', 'irritated', 'furious'];
    
    const lowerText = text.toLowerCase();
    
    if (anxietyKeywords.some(word => lowerText.includes(word))) return 'anxiety';
    if (sadnessKeywords.some(word => lowerText.includes(word))) return 'sadness';
    if (angerKeywords.some(word => lowerText.includes(word))) return 'anger';
    
    return 'neutral';
  };

  // Mock AI responses based on emotion
  const generateAIResponse = (userMessage: string, emotion: string): string => {
    const responses = {
      anxiety: [
        "I can sense you're feeling anxious right now. That's completely valid. Would you like to try a quick breathing exercise together? Sometimes focusing on our breath can help calm our nervous system.",
        "Anxiety can feel overwhelming, but you're not alone in this. Let's break this down - what specifically is making you feel worried right now?",
        "It sounds like you're experiencing some stress. Remember, anxiety is your body trying to protect you, but sometimes it can be too much. What would help you feel safer right now?"
      ],
      sadness: [
        "I hear that you're going through a difficult time. Your feelings are valid, and it's okay to feel sad. Sometimes we need to sit with our emotions before we can move through them.",
        "Sadness can feel heavy, and I want you to know that it's okay to not be okay sometimes. What's been weighing on your heart lately?",
        "Thank you for sharing something so personal with me. Feeling sad is a natural human emotion. Would it help to talk about what's been contributing to these feelings?"
      ],
      anger: [
        "I can hear the frustration in your words. Anger often comes from feeling unheard or powerless. What's been making you feel this way?",
        "It sounds like something has really upset you. Anger can be a valid emotion - it often tells us that something important to us is being threatened. Can you tell me more?",
        "Your anger is understandable. Sometimes when we're frustrated, it helps to express it in a safe space like this. What would you want to change about the situation that's bothering you?"
      ],
      neutral: [
        "Thank you for sharing that with me. I'm here to listen and support you. How has your day been overall?",
        "I appreciate you opening up. What's been on your mind lately that you'd like to talk about?",
        "It's good to hear from you. Sometimes it helps just to have someone listen. What would be most helpful for you right now?"
      ]
    };

    const responseArray = responses[emotion as keyof typeof responses] || responses.neutral;
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const emotion = detectEmotion(inputValue);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      emotion
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue, emotion),
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">AI Wellness Companion</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Always here to listen</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-3 m-4 rounded">
        <div className="flex items-center">
          <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            I'm an AI companion, not a therapist. If you're in crisis or having thoughts of self-harm, 
            please contact emergency services or call 988 (Suicide & Crisis Lifeline) immediately.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-indigo-600' 
                    : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Heart className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' 
                    ? 'text-indigo-200' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex mr-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={1}
              style={{ maxHeight: '120px', minHeight: '48px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;