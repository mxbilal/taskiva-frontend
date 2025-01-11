"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusCircle, Users, Briefcase, TrendingUp,
  Clock, CheckCircle, XCircle, AlertCircle,
  FileText, MessageSquare, Star
} from 'lucide-react';
import Link from 'next/link';
import JoinTeamModal from '@/app/components/modals/JoinTeamModal';

export default function TalentDashboard() {
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false);

  const stats = [
    { label: 'Active Proposals', value: '5', icon: FileText, color: 'emerald' },
    { label: 'Teams Joined', value: '2', icon: Users, color: 'blue' },
    { label: 'Completed Jobs', value: '12', icon: CheckCircle, color: 'green' },
    { label: 'Saved Jobs', value: '8', icon: Star, color: 'yellow' }
  ];

  const recommendedJobs = [
    {
      title: 'Senior React Developer',
      company: 'Tech Innovators Inc.',
      type: 'Full-time',
      budget: '$80-100k/year',
      skills: ['React', 'TypeScript', 'Node.js'],
      posted: '2 hours ago'
    },
    {
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      type: 'Contract',
      budget: '$75/hour',
      skills: ['Figma', 'UI Design', 'User Research'],
      posted: '5 hours ago'
    },
    {
      title: 'Full Stack Developer',
      company: 'StartUp Labs',
      type: 'Project-based',
      budget: '$15,000-20,000',
      skills: ['React', 'Python', 'PostgreSQL'],
      posted: '1 day ago'
    }
  ];

  const handleJoinTeamRequest = (teamId: string) => {
    // Handle the join team request
    console.log('Requested to join team:', teamId);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
          <p className="text-gray-600">Here are some opportunities that match your skills</p>
        </div>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowJoinTeamModal(true)}
            className="bg-white border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Users className="h-5 w-5" />
            <span>Join Team</span>
          </motion.button>
          <Link href="/dashboard/teams/create">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Create Team</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommended Jobs */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recommended Jobs</h2>
          <Link href="/dashboard/jobs" className="text-emerald-600 hover:text-emerald-700">
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {recommendedJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:border-emerald-500 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {job.budget}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.posted}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Your Teams */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Web3 Development Squad',
              role: 'Frontend Developer',
              members: 4,
              activeProjects: 2
            },
            {
              name: 'Mobile App Team',
              role: 'UI Designer',
              members: 3,
              activeProjects: 1
            }
          ].map((team, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{team.name}</h3>
                  <p className="text-sm text-gray-600">{team.role}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  View Team
                </motion.button>
              </div>
              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {team.members} members
                </span>
                <span className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {team.activeProjects} active projects
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Join Team Modal */}
      <JoinTeamModal
        isOpen={showJoinTeamModal}
        onClose={() => setShowJoinTeamModal(false)}
        onJoinRequest={handleJoinTeamRequest}
      />
    </div>
  );
}