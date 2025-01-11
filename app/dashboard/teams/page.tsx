"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Star, Clock, CheckCircle, Search,
  Calendar, MessageSquare, BarChart, ChevronDown,
  Mail, Phone, Globe, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

type TeamStatus = 'active' | 'completed';
type SortOption = 'newest' | 'oldest' | 'rating-high' | 'rating-low';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface Team {
  id: string;
  name: string;
  status: TeamStatus;
  members: TeamMember[];
  rating: number;
  projectTitle: string;
  startDate: string;
  endDate?: string;
  completedProjects: number;
  activeProjects: number;
  description: string;
  skills: string[];
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Web3 Development Squad',
    status: 'active',
    members: [
      { name: 'Sarah Chen', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop' },
      { name: 'Michael Park', role: 'Smart Contract Dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' },
      { name: 'Emma Wilson', role: 'UI Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop' }
    ],
    rating: 4.9,
    projectTitle: 'DeFi Platform Development',
    startDate: '2024-01-15',
    completedProjects: 8,
    activeProjects: 1,
    description: 'Specialized team in blockchain and DeFi development with strong expertise in smart contracts and Web3 integration.',
    skills: ['Solidity', 'React', 'Node.js', 'Web3.js']
  },
  {
    id: '2',
    name: 'Mobile App Team',
    status: 'active',
    members: [
      { name: 'David Kim', role: 'iOS Developer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop' },
      { name: 'Lisa Wang', role: 'Android Developer', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop' }
    ],
    rating: 4.7,
    projectTitle: 'E-commerce Mobile App',
    startDate: '2024-02-01',
    completedProjects: 5,
    activeProjects: 1,
    description: 'Cross-platform mobile development team with expertise in React Native and native development.',
    skills: ['React Native', 'iOS', 'Android', 'Firebase']
  },
  {
    id: '3',
    name: 'Full Stack Team',
    status: 'completed',
    members: [
      { name: 'John Doe', role: 'Full Stack Lead', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' },
      { name: 'Alice Brown', role: 'Backend Developer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop' }
    ],
    rating: 4.8,
    projectTitle: 'CRM System Development',
    startDate: '2023-10-01',
    endDate: '2024-01-30',
    completedProjects: 12,
    activeProjects: 0,
    description: 'Experienced team in building enterprise-grade web applications and CRM systems.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS']
  }
];

export default function TeamsPage() {
  const [activeTab, setActiveTab] = useState<TeamStatus>('active');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'active', label: 'Active Teams', icon: Users },
    { id: 'completed', label: 'Completed Projects', icon: CheckCircle }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating-high', label: 'Rating: High to Low' },
    { value: 'rating-low', label: 'Rating: Low to High' }
  ];

  const filteredTeams = mockTeams
    .filter(team => team.status === activeTab)
    .filter(team => 
      searchQuery === '' || 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hired Teams</h1>
          <p className="text-gray-600">Manage your professional teams and track their progress</p>
        </div>
        <Link
          href="/dashboard/teams/browse"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Browse Teams
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TeamStatus)}
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

      {/* Teams List */}
      <div className="space-y-6">
        {filteredTeams.map((team) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
                  <p className="text-gray-600 mt-1">{team.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">{team.rating}</span>
                </div>
              </div>

              {/* Project Info */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900">Current Project</h4>
                <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Started {new Date(team.startDate).toLocaleDateString()}
                  </span>
                  {team.endDate && (
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed {new Date(team.endDate).toLocaleDateString()}
                    </span>
                  )}
                  <span className="flex items-center">
                    <BarChart className="h-4 w-4 mr-1" />
                    {team.completedProjects} completed, {team.activeProjects} active
                  </span>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Team Members</h4>
                <div className="flex flex-wrap gap-4">
                  {team.members.map((member, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {team.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="flex items-center text-sm text-gray-600 hover:text-emerald-600">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message Team
                </button>
                <button className="flex items-center text-sm text-gray-600 hover:text-emerald-600">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </button>
              </div>
              <Link
                href={`/dashboard/teams/${team.id}`}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No teams found</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? "No teams match your search criteria" 
                : `You don't have any ${activeTab} teams`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}