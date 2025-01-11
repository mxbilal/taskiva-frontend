"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Users, Mail, Phone, Globe, MapPin,
  Camera, Plus, Briefcase, Award, CheckCircle,
  FileText, Edit, Trash, AlertCircle
} from 'lucide-react';

interface CompanyProfile {
  name: string;
  industry: string;
  size: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  logo: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

const mockProfile: CompanyProfile = {
  name: 'TechCorp Solutions',
  industry: 'Software Development',
  size: '50-100 employees',
  website: 'www.techcorp.com',
  email: 'contact@techcorp.com',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Street, San Francisco, CA 94105',
  description: 'Leading provider of innovative software solutions for enterprises worldwide.',
  logo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=200&fit=crop'
};

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Project Manager',
    email: 'john@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Technical Lead',
    email: 'sarah@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
  }
];

export default function CompanyPage() {
  const [profile, setProfile] = useState<CompanyProfile>(mockProfile);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'verification'>('profile');

  const handleProfileChange = (field: keyof CompanyProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const inputClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400";

  const tabs = [
    { id: 'profile', label: 'Company Profile', icon: Building2 },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'verification', label: 'Verification', icon: CheckCircle }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
        <p className="text-gray-600">Manage your company profile and team members</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm"
      >
        {activeTab === 'profile' && (
          <div className="p-6">
            {/* Logo Upload */}
            <div className="mb-8 flex items-center space-x-6">
              <div className="relative">
                <img
                  src={profile.logo}
                  alt={profile.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Company Logo</h3>
                <p className="text-sm text-gray-600">
                  Upload a high-resolution company logo
                </p>
              </div>
            </div>

            {/* Company Information Form */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={profile.industry}
                  onChange={(e) => handleProfileChange('industry', e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Company Size
                </label>
                <select 
                  value={profile.size}
                  onChange={(e) => handleProfileChange('size', e.target.value)}
                  className={inputClasses}
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="50-100 employees">50-100 employees</option>
                  <option value="100+ employees">100+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={profile.website}
                  onChange={(e) => handleProfileChange('website', e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => handleProfileChange('address', e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Company Description
                </label>
                <textarea
                  rows={4}
                  value={profile.description}
                  onChange={(e) => handleProfileChange('description', e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
              <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700">
                <Plus className="h-4 w-4" />
                <span>Add Member</span>
              </button>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-600 hover:text-emerald-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-red-600">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="p-6">
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Company Verified
              </h3>
              <p className="text-gray-600 mt-2">
                Your company has been verified and is eligible for all platform features
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium text-gray-900">Business Registration</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Verified on March 15, 2024
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium text-gray-900">Tax Compliance</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Verified on March 15, 2024
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}