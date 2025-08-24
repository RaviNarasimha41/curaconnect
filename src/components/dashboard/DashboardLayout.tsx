import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  BarChart3, 
  MessageCircle, 
  Settings, 
  LogOut,
  Shield,
  Users,
  FileText
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { PredictionWidget } from './PredictionWidget';
import { BlockchainRecords } from './BlockchainRecords';
import { P2PChat } from '../chat/P2PChat';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<'overview' | 'blockchain' | 'analytics'>('overview');
  const [showP2PChat, setShowP2PChat] = useState(false);

  const sidebarItems = [
    { 
      id: 'overview', 
      name: 'Overview', 
      icon: Heart, 
      description: 'AI Predictions & Dashboard' 
    },
    { 
      id: 'blockchain', 
      name: 'Blockchain Records', 
      icon: Shield, 
      description: 'Patient Records & Verification' 
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: BarChart3, 
      description: 'Donation History & Reports' 
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Cura<span className="text-red-600">Connect</span> Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* P2P Support Chat Button */}
            <Button
              onClick={() => setShowP2PChat(true)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Support Chat (P2P Secure)</span>
            </Button>

            {user?.role === 'admin' && (
              <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                Admin
              </div>
            )}

            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {activeSection === 'overview' && (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Dashboard Overview
                  </h2>
                  <p className="text-gray-600">
                    AI-powered predictions and key insights for healthcare management
                  </p>
                </div>
                <PredictionWidget />
                
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Predictions</p>
                        <p className="text-2xl font-bold text-gray-900">1,247</p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Verified Records</p>
                        <p className="text-2xl font-bold text-gray-900">856</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Shield className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">342</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSection === 'blockchain' && (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Blockchain Records
                  </h2>
                  <p className="text-gray-600">
                    Secure patient records with blockchain verification
                  </p>
                </div>
                <BlockchainRecords />
              </>
            )}

            {activeSection === 'analytics' && (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Analytics & Reports
                  </h2>
                  <p className="text-gray-600">
                    Comprehensive insights and donation history
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Analytics Coming Soon
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We're working on comprehensive analytics and reporting features.
                  </p>
                  <Button variant="outline">
                    Request Early Access
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* P2P Chat */}
      <P2PChat isOpen={showP2PChat} onClose={() => setShowP2PChat(false)} />
    </div>
  );
}