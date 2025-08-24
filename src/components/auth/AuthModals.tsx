import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalsProps {
  loginOpen: boolean;
  registerOpen: boolean;
  onLoginClose: () => void;
  onRegisterClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

export function AuthModals({
  loginOpen,
  registerOpen,
  onLoginClose,
  onRegisterClose,
  onSwitchToRegister,
  onSwitchToLogin,
}: AuthModalsProps) {
  const { login, register, isLoading } = useAuth();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!loginData.email || !loginData.password) {
      setErrors({ general: 'Please fill in all fields' });
      return;
    }

    try {
      await login(loginData.email, loginData.password);
      onLoginClose();
      // Redirect handled by App component
    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!registerData.name || !registerData.email || !registerData.password) {
      setErrors({ general: 'Please fill in all fields' });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    if (registerData.password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters' });
      return;
    }

    try {
      await register(registerData.email, registerData.password, registerData.name);
      onRegisterClose();
      // Redirect handled by App component
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Modal
        isOpen={loginOpen}
        onClose={onLoginClose}
        title="Welcome Back"
        size="sm"
      >
        <form onSubmit={handleLogin} className="space-y-4">
          {errors.general && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {errors.general}
            </div>
          )}
          
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          
          <div className="flex flex-col space-y-3">
            <Button type="submit" loading={isLoading} className="w-full">
              Sign In
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={registerOpen}
        onClose={onRegisterClose}
        title="Create Account"
        size="sm"
      >
        <form onSubmit={handleRegister} className="space-y-4">
          {errors.general && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {errors.general}
            </div>
          )}
          
          <Input
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            required
          />
          
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="Create a password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            error={errors.password}
            helperText="Must be at least 6 characters"
            required
          />
          
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            required
          />
          
          <div className="flex flex-col space-y-3">
            <Button type="submit" loading={isLoading} className="w-full">
              Create Account
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}