"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build your dream team,<br />
            your way
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join forces with talented professionals. Work solo or build powerful teams.<br />
            Multiple roles, endless possibilities.
          </p>
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 flex items-center">
            Start Collaborating <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          {/* Trust Bar */}
          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-4">Trusted by leading teams worldwide</p>
            <div className="grid grid-cols-4 gap-8 opacity-50">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=50&fit=crop&auto=format" alt="Microsoft" className="h-8 object-contain" />
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=50&fit=crop&auto=format" alt="Airbnb" className="h-8 object-contain" />
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=50&fit=crop&auto=format" alt="Google" className="h-8 object-contain" />
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=50&fit=crop&auto=format" alt="Apple" className="h-8 object-contain" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format" 
            alt="Team collaboration" 
            className="rounded-lg shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-sm font-medium">Flexible Collaboration</p>
            </div>
            <p className="text-gray-600 text-sm">
              Work individually or form teams - you choose how to showcase your talents
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}