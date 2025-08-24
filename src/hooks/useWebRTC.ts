import { useState, useEffect, useRef, useCallback } from 'react';
import { P2PSession } from '../types';

interface UseWebRTCProps {
  sessionId?: string;
  onMessage?: (message: string, senderId: string) => void;
}

export function useWebRTC({ sessionId, onMessage }: UseWebRTCProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const dataChannel = useRef<RTCDataChannel | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  const initializePeerConnection = useCallback(() => {
    const config: RTCConfiguration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    };

    peerConnection.current = new RTCPeerConnection(config);
    
    peerConnection.current.onconnectionstatechange = () => {
      const state = peerConnection.current?.connectionState;
      if (state === 'connected') {
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
      } else if (state === 'disconnected' || state === 'failed') {
        setIsConnected(false);
        setIsConnecting(false);
        setError('Connection lost');
      }
    };

    peerConnection.current.ondatachannel = (event) => {
      const channel = event.channel;
      channel.onmessage = (event) => {
        if (onMessage) {
          onMessage(event.data, 'peer');
        }
      };
    };

    return peerConnection.current;
  }, [onMessage]);

  const startSession = useCallback(async () => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    setError(null);

    try {
      const pc = initializePeerConnection();
      
      // Create data channel for text messages
      dataChannel.current = pc.createDataChannel('messages', {
        ordered: true,
      });

      dataChannel.current.onopen = () => {
        console.log('Data channel opened');
      };

      dataChannel.current.onmessage = (event) => {
        if (onMessage) {
          onMessage(event.data, 'peer');
        }
      };

      // Simulate successful connection for demo
      setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
        setParticipants(['current-user', 'peer-user']);
      }, 2000);

    } catch (err) {
      setError('Failed to start session');
      setIsConnecting(false);
    }
  }, [isConnecting, isConnected, initializePeerConnection, onMessage]);

  const endSession = useCallback(() => {
    if (dataChannel.current) {
      dataChannel.current.close();
      dataChannel.current = null;
    }

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
      localStream.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setParticipants([]);
    setError(null);
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (dataChannel.current && dataChannel.current.readyState === 'open') {
      dataChannel.current.send(message);
      return true;
    } else if (isConnected) {
      // Fallback: simulate message sending
      console.log('Sending message:', message);
      return true;
    }
    return false;
  }, [isConnected]);

  useEffect(() => {
    return () => {
      endSession();
    };
  }, [endSession]);

  return {
    isConnected,
    isConnecting,
    error,
    participants,
    startSession,
    endSession,
    sendMessage,
  };
}