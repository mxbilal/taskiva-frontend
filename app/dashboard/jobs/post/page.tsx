"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Users, DollarSign } from 'lucide-react';

type ExperienceLevel = 'entry' | 'intermediate' | 'expert' | '';
type ProjectLength = 'short' | 'medium' | 'long' | '';
type PaymentType = 'fixed' | 'hourly' | '';

interface FormData {
  title: string;
  description: string;
  skills: string[];
  skillInput: string;
  experienceLevel: ExperienceLevel;
  projectLength: ProjectLength;
  paymentType: PaymentType;
  budget: string;
  teamSize: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

export default function PostJobPage() {
  const [hiringType, setHiringType] = useState<'individual' | 'team'>('individual');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    skills: [],
    skillInput: '',
    experienceLevel: '',
    projectLength: '',
    paymentType: '',
    budget: '',
    teamSize: '2'
  });

  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && formData.skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(formData.skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, formData.skillInput.trim()],
          skillInput: ''
        });
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
        <p className="text-gray-600">Find the perfect talent for your project</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What type of talent are you looking for?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setHiringType('individual')}
            className={`p-4 rounded-lg border-2 flex items-center space-x-4 ${
              hiringType === 'individual' 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-200 hover:border-emerald-200'
            }`}
          >
            <div className="bg-emerald-100 p-3 rounded-lg">
              <User className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Individual Professional</h3>
              <p className="text-sm text-gray-600">Hire a single talented professional</p>
            </div>
          </button>

          <button
            onClick={() => setHiringType('team')}
            className={`p-4 rounded-lg border-2 flex items-center space-x-4 ${
              hiringType === 'team' 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-200 hover:border-emerald-200'
            }`}
          >
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Professional Team</h3>
              <p className="text-sm text-gray-600">Hire a pre-formed team</p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Job Details Form */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            placeholder="e.g., Senior React Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Job Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            placeholder="Describe the project and requirements..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Required Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skills.map((skill) => (
              <motion.span
                key={skill}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-emerald-600 hover:text-emerald-800"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>
          <input
            type="text"
            value={formData.skillInput}
            onChange={(e) => setFormData({ ...formData, skillInput: e.target.value })}
            onKeyDown={handleSkillInput}
            className="w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            placeholder="Type a skill and press Enter"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Experience Level
            </label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as ExperienceLevel })}
              className="w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
            >
              <option value="" className="text-gray-400">Select level</option>
              <option value="entry">Entry Level</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Project Length
            </label>
            <select
              value={formData.projectLength}
              onChange={(e) => setFormData({ ...formData, projectLength: e.target.value as ProjectLength })}
              className="w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
            >
              <option value="" className="text-gray-400">Select length</option>
              <option value="short">Short Term (1-3 months)</option>
              <option value="medium">Medium Term (3-6 months)</option>
              <option value="long">Long Term (6+ months)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Payment Type
            </label>
            <select
              value={formData.paymentType}
              onChange={(e) => setFormData({ ...formData, paymentType: e.target.value as PaymentType })}
              className="w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
            >
              <option value="" className="text-gray-400">Select payment type</option>
              <option value="fixed">Fixed Price</option>
              <option value="hourly">Hourly Rate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Budget
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="Enter budget"
              />
            </div>
          </div>
        </div>

        {hiringType === 'team' && (
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Preferred Team Size
            </label>
            <input
              type="number"
              min="2"
              value={formData.teamSize}
              onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
              className="w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
            />
          </div>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Post Job
        </button>
      </motion.div>
    </motion.div>
  );
}