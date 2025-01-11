"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Briefcase, DollarSign, Clock,
  Star, MapPin, Building2, ChevronDown, Sliders,
  X, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  experience: 'Entry' | 'Intermediate' | 'Expert';
  salary: string;
  posted: string;
  description: string;
  skills: string[];
  applicants: number;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Expert',
    salary: '$120k - $150k/year',
    posted: '2 hours ago',
    description: 'We are looking for an experienced Full Stack Developer to join our growing team...',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    applicants: 12
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'New York, USA',
    type: 'Contract',
    experience: 'Intermediate',
    salary: '$80/hour',
    posted: '1 day ago',
    description: 'Join our creative team as a UI/UX Designer and help shape the future of our products...',
    skills: ['Figma', 'UI Design', 'User Research', 'Prototyping'],
    applicants: 8
  }
];

export default function BrowseJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: [] as string[],
    experience: [] as string[],
    salary: [] as string[],
    location: [] as string[],
    skills: [] as string[]
  });
  const [showFilters, setShowFilters] = useState(true);

  const filters = {
    jobType: [
      { label: 'Full-time', value: 'Full-time' },
      { label: 'Part-time', value: 'Part-time' },
      { label: 'Contract', value: 'Contract' },
      { label: 'Freelance', value: 'Freelance' }
    ],
    experience: [
      { label: 'Entry Level', value: 'Entry' },
      { label: 'Intermediate', value: 'Intermediate' },
      { label: 'Expert', value: 'Expert' }
    ],
    salary: [
      { label: '$0 - $50k', value: '0-50k' },
      { label: '$50k - $100k', value: '50k-100k' },
      { label: '$100k - $150k', value: '100k-150k' },
      { label: '$150k+', value: '150k+' }
    ],
    location: [
      { label: 'Remote', value: 'Remote' },
      { label: 'On-site', value: 'On-site' },
      { label: 'Hybrid', value: 'Hybrid' }
    ],
    skills: [
      { label: 'React', value: 'React' },
      { label: 'Node.js', value: 'Node.js' },
      { label: 'Python', value: 'Python' },
      { label: 'UI/UX', value: 'UI/UX' },
      { label: 'DevOps', value: 'DevOps' }
    ]
  };

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].includes(value)
        ? prev[category as keyof typeof prev].filter(item => item !== value)
        : [...prev[category as keyof typeof prev], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      jobType: [],
      experience: [],
      salary: [],
      location: [],
      skills: []
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Find Work</h1>
        <p className="text-gray-600">Browse through thousands of job opportunities</p>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`w-64 bg-white rounded-xl shadow-sm p-6 h-fit ${showFilters ? 'block' : 'hidden'}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button 
              onClick={clearFilters}
              className="text-sm text-emerald-600 hover:text-emerald-700"
            >
              Clear all
            </button>
          </div>

          {Object.entries(filters).map(([category, options]) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="space-y-2">
                {options.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters[category as keyof typeof selectedFilters].includes(option.value)}
                      onChange={() => toggleFilter(category, option.value)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title, skill, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
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
                  <Link 
                    href={`/dashboard/jobs/browse/${job.id}/apply`}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                  >
                    Apply Now
                  </Link>
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

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {job.type}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job.salary}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.posted}
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {job.applicants} applicants
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}