// src/components/ui/LoginForm.js
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/reduxStore/actions/authActions';
import { showSuccess, showError } from '@/utils/alertManager';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Login attempt for:', username);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        // Prepare user data for Redux
        const userData = {
          ...data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };

        // Update Redux store
        dispatch(loginUser(userData));

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        showSuccess('Login successful!');
        
        // Redirect after short delay
        setTimeout(() => {
          router.push('/Dashboard');
        }, 2000);
      } else {
        showError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-b from-blue-300/40 to-green-300/40 rounded-full blur-3xl animate-float"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-b from-blue-300/40 to-green-300/40 rounded-full blur-3xl animate-float-delay"></div>

      {/* Form card */}
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative z-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome Back! <br /> Relax & Order
        </h1>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username input */}
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                className="peer w-full border-b-2 border-gray-300 px-0 py-2.5 placeholder-transparent focus:border-blue-500 focus:outline-none"
                required
              />
              <label
                htmlFor="username"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
              >
                Username
              </label>
            </div>

            {/* Password input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="peer w-full border-b-2 border-gray-300 px-0 py-2.5 placeholder-transparent focus:border-blue-500 focus:outline-none"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
              >
                Password
              </label>
            </div>

            {/* Forgot username link */}
            <div className="text-right">
              <a href="/forgot-username" className="text-blue-500 hover:text-blue-600 text-sm">
                Forgot your username?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors"
              disabled={isLoading}
            >
              Login
            </button>

            {/* Sign-up prompt */}
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/Account" className="text-blue-500 hover:text-blue-600">
                Sign up here
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;