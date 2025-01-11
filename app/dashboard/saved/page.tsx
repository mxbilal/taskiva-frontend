"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Briefcase, DollarSign, Clock,
  Star, MapPin, Building2, ChevronDown, Heart,
  Users, Trash
} from 'lucide-react';
import Link from 'next/link';

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  deadline: string;
  applicants: number;
  skills: string[];
  description: string;
  saved: string;
}

const mockSavedJobs: SavedJob[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k/year',
    posted: '2 days ago',
    deadline: '2024-03-30',
    applicants: 15,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    description: 'Looking for an experienced Full Stack Developer to join our growing team...',
    saved: '2024-03-01'
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$80/hour',
    posted: '1 week ago',
    deadline: '2024-03-25',
    applicants: 8,
    skills: ['Figma', 'UI Design', 'User Research'],
    description: 'Join our creative team as a UI/UX Designer and help shape the future...',
    saved: '2024-02-28'
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'Cloud Systems Inc',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130k - $160k/year',
    posted: '3 days ago',
    deadline: '2024-04-15',
    applicants: 12,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    description: 'Seeking a skilled DevOps Engineer to help scale our infrastructure...',
    saved: '2024-03-02'
  }
];

export default function SavedJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'deadline' | 'salary'>('newest');

  const sortOptions = [
    { value: 'newest', label: 'Recently Saved' },
    { value: 'deadline', label: 'Application Deadline' },
    { value: 'salary', label: 'Salary: High to Low' }
  ];

  const filteredJobs = mockSavedJobs.filter(job => 
    searchQuery === '' || 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-gray-600">Keep track of interesting opportunities</p>
        </div>
        <Link
          href="/dashboard/jobs/browse"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Browse More Jobs
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search saved jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
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

      {/* Saved Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-gray-600">
                    <span className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {job.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-red-600 hover:text-red-700">
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

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

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-6 text-gray-600">
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job.salary}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Posted {job.posted}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {job.applicants} applicants
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Saved {new Date(job.saved).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/dashboard/jobs/browse/${job.id}/apply`}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No saved jobs found</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? "No jobs match your search criteria" 
                : "Start saving interesting jobs to view them later"}
            </p>
            <Link
              href="/dashboard/jobs/browse"
              className="mt-4 inline-flex items-center text-emerald-600 hover:text-emerald-700"
            >
              Browse Available Jobs
              <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}