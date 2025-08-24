import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Users, Shield, Phone, PhoneOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { useWebRTC } from '../../hooks/useWebRTC';
import { ChatMessage } from '../../types';

interface P2PChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function P2PChat({ isOpen, onClose }: P2PChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    isConnected, 
    isConnecting, 
    error, 
    participants, 
    startSession, 
    endSession, 
    sendMessage 
  } = useWebRTC({
    onMessage: (content: string, senderId: string) => {
      const message: ChatMessage = {
        id: Date.now().toString(),
        content,
        sender: senderId === 'peer' ? 'peer' : 'user',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, message]);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, message]);

    if (isConnected) {
      sendMessage(newMessage.trim());
    }

    setNewMessage('');
  };

  const handleStartSession = async () => {
    await startSession();
  };

  const handleEndSession = () => {
    endSession();
    setMessages([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed right-4 top-20 bottom-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">P2P Support Chat</h3>
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-gray-500">End-to-end encrypted</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Connection Status */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : isConnecting ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                }`} />
                <span className="text-xs text-gray-600">
                  {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}
                </span>
                {isConnected && (
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{participants.length}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-1">
                {!isConnected && !isConnecting && (
                  <Button
                    size="sm"
                    onClick={handleStartSession}
                    className="px-3 py-1 text-xs"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Connect
                  </Button>
                )}
                
                {(isConnected || isConnecting) && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={handleEndSession}
                    className="px-3 py-1 text-xs"
                  >
                    <PhoneOff className="h-3 w-3 mr-1" />
                    End
                  </Button>
                )}
              </div>
            </div>
            
            {error && (
              <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                {error}
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-8">
                <Shield className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>Secure chat ready</p>
                <p className="text-xs mt-1">Messages are end-to-end encrypted</p>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-red-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}>
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-red-200' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder={isConnected ? "Type a message..." : "Connect to start chatting"}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={!isConnected}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!isConnected || !newMessage.trim()}
                className="px-3 py-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}