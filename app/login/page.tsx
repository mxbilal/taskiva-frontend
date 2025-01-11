"use client";

import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <LoginForm />
    </div>
  );
}