import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { About } from '../components/sections/About';
import { CTA } from '../components/sections/CTA';
import { Footer } from '../components/sections/Footer';
import { AuthModals } from '../components/auth/AuthModals';
import { AIChatbot } from '../components/chat/AIChatbot';
import { useAuth } from '../contexts/AuthContext';
import { Rewards } from '../components/sections/Rewards';
import DonorsSection from '../components/sections/DonorsSection';
import BackgroundParticles from '../components/BackgroundParticles'; // ✅ import background

export function LandingPage() {
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    } else {
      setRegisterOpen(true);
    }
  };

  const handleLearnMore = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const switchToRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const switchToLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔴 Animated Futuristic Background */}
      <BackgroundParticles />

      {/* 🔴 Main Content */}
      <Navbar
        onLoginOpen={() => setLoginOpen(true)}
        onRegisterOpen={() => setRegisterOpen(true)}
      />
      
      <Hero 
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
      />
      
      <Features />
      
      <About />
      
      <Rewards />

      <DonorsSection /> 
      
      <CTA onGetStarted={handleGetStarted} />
      
      <Footer />

      <AuthModals
        loginOpen={loginOpen}
        registerOpen={registerOpen}
        onLoginClose={() => setLoginOpen(false)}
        onRegisterClose={() => setRegisterOpen(false)}
        onSwitchToRegister={switchToRegister}
        onSwitchToLogin={switchToLogin}
      />

      {/* Anti-flicker sticky chatbot */}
      <AIChatbot />
    </div>
  );
}
