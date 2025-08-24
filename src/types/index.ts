// Core type definitions for the application
export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface PredictionInput {
  donations_till_date: number;
  cycle_of_donations: number;
  frequency_in_days: number;
  donated_earlier: boolean;
  active_status: boolean;
}

export interface PredictionResult {
  eligible: boolean;
  score: number;
  top_factors: Array<{
    feature: string;
    importance: number;
    impact: 'positive' | 'negative';
  }>;
}

export interface BlockchainRecord {
  id: string;
  patientId: string;
  donorId?: string;
  hospitalId: string;
  bloodType: string;
  eventType: 'transfusion' | 'donation';
  date: string;
  notes?: string;
  recordHash: string;
  txHash?: string;
  blockNumber?: number;
  status: 'pending' | 'verified' | 'invalid';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'peer';
  timestamp: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export interface P2PSession {
  id: string;
  participants: string[];
  status: 'connecting' | 'connected' | 'ended';
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  hospitalId: string;
  bloodType: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
}