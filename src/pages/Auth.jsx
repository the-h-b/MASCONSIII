import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { cn } from '../lib/utils';
import './Auth.css';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For demo purposes, check if the credentials match the dummy credentials
    if (isSignIn) {
      if (isAdmin) {
        // Admin login
        if (email === 'admin@masconsiii.com' && password === '7654321') {
          // Store admin status in localStorage
          localStorage.setItem('userRole', 'admin');
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/admin-dashboard');
        } else {
          alert('Invalid admin credentials. Please use admin@masconsiii.com and password 7654321');
        }
      } else {
        // User login
        if (email === 'user@masconsiii.com' && password === '1234567') {
          // Store user status in localStorage
          localStorage.setItem('userRole', 'user');
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/basic-details');
        } else {
          alert('Invalid user credentials. Please use user@masconsiii.com and password 1234567');
        }
      }
    } else {
      // For sign up, just redirect to the first page based on role
      if (isAdmin) {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/admin-dashboard');
      } else {
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/basic-details');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">MASCONSIII</h1>
          <p className="auth-subtitle">
            {isSignIn ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        {/* Toggle between User and Admin */}
        <div className="toggle-container">
          <div className="toggle-wrapper">
            <button
              className={`toggle-button ${!isAdmin ? 'active' : 'inactive'}`}
              onClick={() => setIsAdmin(false)}
            >
              User
            </button>
            <button
              className={`toggle-button ${isAdmin ? 'active' : 'inactive'}`}
              onClick={() => setIsAdmin(true)}
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required={!isSignIn}
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="form-input"
            />
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe} 
                onCheckedChange={setRememberMe} 
              />
              <label htmlFor="remember-me" className="remember-me-label">
                Remember me
              </label>
            </div>

            {isSignIn && (
              <div>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="submit-button"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className="auth-switch">
          <p>
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="auth-switch-button"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="auth-terms">
          <p>
            By continuing, you agree to MASCONSIII's{' '}
            <a href="#">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;