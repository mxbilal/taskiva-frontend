"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Clock, CheckCircle, XCircle, 
  AlertCircle, Users, DollarSign, Calendar, ChevronDown 
} from 'lucide-react';
import Link from 'next/link';

type JobStatus = 'active' | 'completed' | 'deleted';
type SortOption = 'newest' | 'oldest' | 'budget-high' | 'budget-low';

interface Job {
  id: string;
  title: string;
  status: JobStatus;
  type: 'individual' | 'team';
  budget: string;
  proposals: number;
  posted: string;
  skills: string[];
  description: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    status: 'active',
    type: 'individual',
    budget: '$5,000-$7,000',
    proposals: 12,
    posted: '2 days ago',
    skills: ['React', 'TypeScript', 'Node.js'],
    description: 'Looking for an experienced React developer to build a modern web application...'
  },
  {
    id: '2',
    title: 'Full Stack Development Team',
    status: 'active',
    type: 'team',
    budget: '$15,000-$20,000',
    proposals: 5,
    posted: '1 week ago',
    skills: ['React', 'Python', 'PostgreSQL'],
    description: 'Seeking a skilled team to develop a complete e-commerce platform...'
  },
  {
    id: '3',
    title: 'Mobile App Development',
    status: 'completed',
    type: 'team',
    budget: '$12,000',
    proposals: 8,
    posted: '1 month ago',
    skills: ['React Native', 'iOS', 'Android'],
    description: 'Cross-platform mobile app development project...'
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    status: 'deleted',
    type: 'individual',
    budget: '$3,000',
    proposals: 15,
    posted: '2 weeks ago',
    skills: ['Figma', 'UI Design', 'User Research'],
    description: 'Need a talented designer for our product redesign...'
  }
];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<JobStatus>('active');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'active', label: 'Active Jobs', icon: Clock },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
    { id: 'deleted', label: 'Deleted', icon: XCircle }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'budget-high', label: 'Budget: High to Low' },
    { value: 'budget-low', label: 'Budget: Low to High' }
  ];

  const filteredJobs = mockJobs
    .filter(job => job.status === activeTab)
    .filter(job => 
      searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'active':
        return 'text-emerald-600 bg-emerald-50';
      case 'completed':
        return 'text-blue-600 bg-blue-50';
      case 'deleted':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
          <p className="text-gray-600">Manage and track your job postings</p>
        </div>
        <Link
          href="/dashboard/jobs/post"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Post New Job
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
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
            onClick={() => setActiveTab(tab.id as JobStatus)}
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

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 mt-1 line-clamp-2">{job.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(job.status)}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {job.budget}
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {job.proposals} proposals
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Posted {job.posted}
              </span>
            </div>
          </motion.div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? "No jobs match your search criteria" 
                : `You don't have any ${activeTab} jobs`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}