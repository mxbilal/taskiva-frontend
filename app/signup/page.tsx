"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase } from 'lucide-react';
import SignupForm from '../components/auth/SignupForm';

export default function SignupPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent"
          >
            How would you like to use Taskiva?
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                type: 'talent',
                title: 'Join as a Professional',
                icon: Users,
                description: 'Work on projects, join teams, or lead your own team'
              },
              {
                type: 'client',
                title: 'Join as a Client',
                icon: Briefcase,
                description: 'Hire talent and manage projects'
              }
            ].map((option) => (
              <motion.button
                key={option.type}
                onClick={() => setSelectedType(option.type)}
                className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                <option.icon className="h-12 w-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <SignupForm userType={selectedType} />
    </div>
  );
}