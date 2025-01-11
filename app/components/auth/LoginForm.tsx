"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/context/auth';

export default function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(formData.email, formData.password);
    if (!success) {
      setError('Invalid credentials. Try client@test.com / 1 or user@test.com / 1');
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-600" />
        
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent"
            >
              Welcome Back
            </motion.h2>
            <p className="text-gray-600 mt-2">
              Sign in to continue to Taskiva
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center space-x-2"
            >
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none z-10" />
            <motion.input
              type="email"
              required
              placeholder="Work email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-800"
              whileFocus="focus"
              variants={inputVariants}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none z-10" />
            <motion.input
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-800"
              whileFocus="focus"
              variants={inputVariants}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link 
              href="/forgot-password"
              className="text-sm text-emerald-600 hover:text-emerald-700"
            >
              Forgot password?
            </Link>
          </motion.div>
          
          <div className="flex space-x-4">
            <motion.a
              href="/"
              className="px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </motion.a>
            
            <motion.button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center space-x-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-6"
          >
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/signup"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}