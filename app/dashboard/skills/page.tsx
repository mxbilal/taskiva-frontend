"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Star, Code, Palette, Brain, 
  TrendingUp, CheckCircle, Lock, Plus,
  Book, Trophy, Target
} from 'lucide-react';

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
  endorsements: number;
  verified: boolean;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  earnedDate: string;
  level: 'Bronze' | 'Silver' | 'Gold';
}

const mockSkills: Record<string, Skill[]> = {
  technical: [
    { name: 'React', level: 'Expert', endorsements: 28, verified: true },
    { name: 'Node.js', level: 'Expert', endorsements: 24, verified: true },
    { name: 'TypeScript', level: 'Expert', endorsements: 20, verified: false },
    { name: 'Python', level: 'Intermediate', endorsements: 15, verified: true }
  ],
  design: [
    { name: 'UI Design', level: 'Expert', endorsements: 18, verified: true },
    { name: 'Figma', level: 'Expert', endorsements: 22, verified: true },
    { name: 'User Research', level: 'Intermediate', endorsements: 12, verified: false }
  ],
  soft: [
    { name: 'Project Management', level: 'Expert', endorsements: 25, verified: true },
    { name: 'Team Leadership', level: 'Expert', endorsements: 20, verified: true },
    { name: 'Communication', level: 'Expert', endorsements: 30, verified: true }
  ]
};

const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Full Stack Master',
    description: 'Completed 10 full stack projects with excellent client feedback',
    icon: Code,
    earnedDate: '2024-02-15',
    level: 'Gold'
  },
  {
    id: '2',
    name: 'Design Excellence',
    description: 'Consistently high-rated UI/UX designs',
    icon: Palette,
    earnedDate: '2024-01-20',
    level: 'Silver'
  },
  {
    id: '3',
    name: 'Problem Solver',
    description: 'Successfully resolved 50+ complex technical challenges',
    icon: Brain,
    earnedDate: '2024-03-01',
    level: 'Gold'
  },
  {
    id: '4',
    name: 'Top Performer',
    description: 'Maintained 5-star rating for 6 consecutive months',
    icon: Trophy,
    earnedDate: '2024-02-01',
    level: 'Bronze'
  }
];

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState<'skills' | 'badges'>('skills');
  const [selectedSkillType, setSelectedSkillType] = useState<'technical' | 'design' | 'soft'>('technical');

  const getBadgeColor = (level: Badge['level']) => {
    switch (level) {
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Silver':
        return 'bg-gray-100 text-gray-800';
      case 'Bronze':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Expert':
        return 'bg-emerald-100 text-emerald-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Beginner':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Skills & Achievements</h1>
        <p className="text-gray-600">Showcase your expertise and professional accomplishments</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'skills'
              ? 'bg-emerald-50 text-emerald-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Professional Skills
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'badges'
              ? 'bg-emerald-50 text-emerald-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Badges & Certifications
        </button>
      </div>

      {activeTab === 'skills' && (
        <div className="space-y-6">
          {/* Skill Categories */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex space-x-4 mb-6">
              {[
                { id: 'technical', label: 'Technical Skills', icon: Code },
                { id: 'design', label: 'Design Skills', icon: Palette },
                { id: 'soft', label: 'Soft Skills', icon: Brain }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedSkillType(category.id as typeof selectedSkillType)}
                  className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-colors ${
                    selectedSkillType === category.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  <category.icon className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {mockSkills[selectedSkillType].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-emerald-500 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{skill.name}</h3>
                        {skill.verified && (
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getSkillLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        <span className="text-sm text-gray-600 flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {skill.endorsements} endorsements
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700">
                    Take Assessment
                  </button>
                </motion.div>
              ))}

              <button className="w-full p-4 border-2 border-dashed rounded-lg text-gray-600 hover:text-emerald-600 hover:border-emerald-500 flex items-center justify-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New Skill</span>
              </button>
            </div>
          </div>

          {/* Skill Statistics */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="h-8 w-8 text-emerald-600" />
                <span className="text-sm text-emerald-600">+15% this month</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">85%</h4>
              <p className="text-gray-600">Skills Verified</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Target className="h-8 w-8 text-emerald-600" />
                <span className="text-sm text-emerald-600">+5 new</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">180</h4>
              <p className="text-gray-600">Total Endorsements</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Star className="h-8 w-8 text-emerald-600" />
                <span className="text-sm text-emerald-600">Top 10%</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">4.9</h4>
              <p className="text-gray-600">Skill Rating</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Book className="h-8 w-8 text-emerald-600" />
                <span className="text-sm text-emerald-600">2 in progress</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">12</h4>
              <p className="text-gray-600">Certifications</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="space-y-6">
          {/* Featured Badges */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Featured Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {mockBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center p-6 border rounded-lg hover:border-emerald-500 transition-colors"
                >
                  <div className={`p-4 rounded-full mb-4 ${getBadgeColor(badge.level)}`}>
                    <badge.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{badge.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(badge.level)}`}>
                    {badge.level} Level
                  </span>
                  <span className="text-xs text-gray-500 mt-2">
                    Earned {new Date(badge.earnedDate).toLocaleDateString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Available Badges */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Available Badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 border rounded-lg bg-gray-50"
                >
                  <div className="p-4 rounded-full mb-4 bg-gray-200">
                    <Lock className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-400 mb-1">Hidden Badge</h3>
                  <p className="text-sm text-gray-400">Complete more projects to unlock</p>
                  <button className="mt-4 text-sm text-emerald-600 hover:text-emerald-700">
                    View Requirements
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}