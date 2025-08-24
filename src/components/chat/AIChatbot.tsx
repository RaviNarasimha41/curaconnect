import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Minimize2, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { ChatMessage } from '../../types';
import { useToxicity } from '../../hooks/useToxicity';





// Anti-flicker sticky chatbot component
export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Anti-flicker: Keep element mounted and use visibility classes
  const [isVisible, setIsVisible] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: 'Hello! I\'m your AI healthcare assistant. I can help you with questions about donations, medical procedures, and general health information. How can I assist you today?',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate AI response
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = generateMockResponse(userMessage.content);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('donation') || input.includes('donate')) {
      return 'Blood donation is a vital process that saves lives! Before donating, ensure you meet the basic requirements: be at least 17 years old, weigh at least 110 pounds, and be in good general health. It\'s recommended to eat iron-rich foods and stay hydrated before donating. The donation process typically takes about 45-60 minutes. Would you like to know more about eligibility requirements or the donation process?';
    }
    
    if (input.includes('eligibility') || input.includes('eligible')) {
      return 'Donor eligibility depends on several factors including your donation history, health status, age, weight, and recent travel. Our AI prediction system can analyze these factors to determine your likelihood of being eligible. Key factors include having donated before, maintaining regular donation cycles, and having an active health status. Would you like me to explain any specific eligibility criteria?';
    }
    
    if (input.includes('blockchain') || input.includes('record')) {
      return 'Our blockchain system ensures that all patient records are securely stored and tamper-proof. Each record is hashed and stored on the Polygon network, providing immutable proof of medical events. This technology enhances trust, enables easy verification, and maintains patient privacy while ensuring data integrity. Healthcare providers can verify the authenticity of any record instantly.';
    }
    
    if (input.includes('blood type') || input.includes('compatibility')) {
      return 'Blood type compatibility is crucial for safe transfusions. Type O- is the universal donor (can give to all types), while AB+ is the universal recipient (can receive from all types). The main blood groups are A, B, AB, and O, each with positive or negative Rh factor. Cross-matching is always performed before transfusion to ensure safety. Would you like to know more about specific blood type compatibilities?';
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('help')) {
      return 'Hello! I\'m here to help you with any questions about healthcare, blood donation, patient records, or our platform features. Feel free to ask about eligibility requirements, donation processes, blockchain security, or any other health-related topics. What would you like to know?';
    }
    
    // Default response
    return 'Thank you for your question! As your AI healthcare assistant, I can provide information about blood donation, eligibility requirements, medical procedures, and our platform features. Could you please provide more specific details about what you\'d like to know? I\'m here to help with any healthcare-related questions you might have.';
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Anti-flicker: Always render the component, control visibility with CSS classes
  return (
    <div 
      className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 9999 
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-4 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                  <p className="text-xs text-gray-500">Powered by Gemini</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearChat}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Minimize2 className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-3 py-2 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask me anything about healthcare..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading || !newMessage.trim()}
                  className="px-3 py-2"
                  variant="secondary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}