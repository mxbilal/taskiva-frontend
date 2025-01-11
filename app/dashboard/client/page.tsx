"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  PlusCircle, Users, Briefcase, TrendingUp,
  Clock, CheckCircle, XCircle, AlertCircle,
  FileText, MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function ClientDashboard() {
  const stats = [
    { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'emerald' },
    { label: 'Total Teams', value: '8', icon: Users, color: 'blue' },
    { label: 'Proposals', value: '24', icon: FileText, color: 'purple' },
    { label: 'Completed', value: '45', icon: CheckCircle, color: 'green' }
  ];

  const recentActivity = [
    {
      type: 'proposal',
      title: 'New proposal received',
      team: 'Web3 Development Squad',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      type: 'milestone',
      title: 'Milestone completed',
      team: 'Creative Tech Studio',
      time: '5 hours ago',
      status: 'completed'
    },
    {
      type: 'message',
      title: 'New message',
      team: 'Mobile App Team',
      time: '1 day ago',
      status: 'unread'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Post New Job</span>
        </motion.button>
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

      {/* Active Jobs */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Active Jobs</h2>
          <Link href="/dashboard/jobs" className="text-emerald-600 hover:text-emerald-700">
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((job) => (
            <motion.div
              key={job}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: job * 0.1 }}
              className="border rounded-lg p-4 hover:border-emerald-500 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Senior Full Stack Developer</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Looking for an experienced developer to join our team...
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  8 proposals
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Posted 2 days ago
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  {activity.status === 'pending' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                  {activity.status === 'completed' && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                  {activity.status === 'unread' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">
                    {activity.team} • {activity.time}
                  </p>
                </div>
              </div>
              <button className="text-emerald-600 hover:text-emerald-700">
                View
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}