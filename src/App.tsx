import React, { useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Handle redirect after successful authentication
  useEffect(() => {
    if (isAuthenticated && window.location.pathname === '/') {
      // Hard redirect to dashboard after successful auth
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Route handling based on URL and authentication state
  const pathname = window.location.pathname;

  // Protected dashboard routes
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    if (!isAuthenticated) {
      // Redirect to landing page if not authenticated
      window.location.href = '/';
      return null;
    }
    return <DashboardLayout />;
  }

  // Landing page (default route)
  return <LandingPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;