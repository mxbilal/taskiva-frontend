"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Mail, Globe, ArrowLeft } from 'lucide-react';
import { countries } from '@/lib/countries';

interface SignupFormProps {
  userType: string;
}

export default function SignupForm({ userType }: SignupFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    marketingEmails: false,
    termsAccepted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
              Join Taskiva
            </motion.h2>
            <p className="text-gray-600 mt-2">
              {userType === 'talent' ? 'Start your professional journey' : 'Start hiring talent'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['firstName', 'lastName'].map((field, index) => (
              <motion.div 
                key={field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                  <motion.input
                    type="text"
                    required
                    placeholder={field === 'firstName' ? 'First name' : 'Last name'}
                    value={formData[field as keyof typeof formData] as string}
                    onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-800"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none z-10" />
            <motion.select
              required
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none text-gray-800"
              whileFocus="focus"
              variants={inputVariants}
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </motion.select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.marketingEmails}
                onChange={(e) => setFormData({...formData, marketingEmails: e.target.checked})}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600">
                Send me emails with tips on how to find talent that fits my needs
              </span>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                required
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600">
                Yes, I understand and agree to the Taskiva Terms of Service, including the User Agreement and Privacy Policy
              </span>
            </label>
          </motion.div>
          
          <div className="flex space-x-4">
            <motion.a
              href="/signup"
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
              <span>Create My Account</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}