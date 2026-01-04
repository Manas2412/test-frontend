// Login.js

import { useState } from 'react';

const HARDCODED_USERNAME = 'TestUser';
const HARDCODED_PASSWORD = 'Test123';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]">
      <div className="w-full max-w-md px-6">
        <div className="bg-[#1a1a2e]/90 backdrop-blur-md border-2 border-[#2a2a3e]/60 rounded-lg shadow-xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-lg bg-[#6666FF] flex items-center justify-center">
              <span className="text-white font-bold text-xl">VS</span>
            </div>
            <span className="text-[#8A8AFF] font-bold text-2xl tracking-tight">
              VectorShift
            </span>
          </div>

          {/* Login Form */}
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Sign In
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-[#0f0f1a] border border-slate-600/40 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#0f0f1a] border border-slate-600/40 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-2 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#3b82f6] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-[#8b5cf6] hover:via-[#7c3aed] hover:to-[#6366f1] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1a1a2e]"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

