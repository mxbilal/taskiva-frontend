"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Star, Clock, Briefcase, Building2,
  MessageSquare, Settings, ArrowLeft, Plus,
  ChevronDown, Globe, Mail, FileText, Link as LinkIcon,
  CheckCircle, Edit, Trash, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import AddTeamMemberModal from '@/app/components/modals/AddTeamMemberModal';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline';
  skills: string[];
  joinedDate: string;
  portfolio: {
    projects: number;
    rating: number;
    completionRate: number;
  };
}

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed';
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Team Lead',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    status: 'online',
    skills: ['Project Management', 'React', 'Node.js'],
    joinedDate: '2023-09-15',
    portfolio: {
      projects: 25,
      rating: 4.9,
      completionRate: 98
    }
  },
  {
    id: '2',
    name: 'Michael Park',
    role: 'Backend Dev',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    status: 'offline',
    skills: ['Python', 'Django', 'PostgreSQL'],
    joinedDate: '2023-10-01',
    portfolio: {
      projects: 18,
      rating: 4.7,
      completionRate: 95
    }
  },
  {
    id: '3',
    name: 'Emma Wilson',
    role: 'UI Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    status: 'online',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
    joinedDate: '2023-11-15',
    portfolio: {
      projects: 15,
      rating: 4.8,
      completionRate: 97
    }
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    status: 'active',
    startDate: '2024-01-15',
    description: 'Complete redesign and development of the company\'s e-commerce platform',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS']
  },
  {
    id: '2',
    name: 'Mobile App Development',
    status: 'completed',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    description: 'Development of a cross-platform mobile application',
    technologies: ['React Native', 'Firebase', 'Redux']
  }
];

export default function TeamDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'projects' | 'settings'>('overview');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [isAdmin] = useState(true); // In real app, this would come from auth context

  const handleInviteUser = (userId: string) => {
    // In a real app, this would make an API call to invite the user
    console.log('Inviting user:', userId);
  };

  const tabs = [
    { id: 'overview', label: 'Team Overview', icon: Building2 },
    { id: 'members', label: 'Team Members', icon: Users },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'settings', label: 'Team Settings', icon: Settings, adminOnly: true }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/dashboard/my-teams" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Teams
        </Link>
      </div>

      {/* Team Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Web3 Development Squad</h1>
            <p className="text-gray-600 mt-1">Specialized team focused on blockchain and DeFi development</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <MessageSquare className="h-5 w-5" />
              <span>Team Chat</span>
            </button>
            {isAdmin && (
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Manage Team
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-6 text-sm text-gray-600">
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {mockTeamMembers.length} Members
          </span>
          <span className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            4.9 Rating
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Created Sep 2023
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
        {tabs.map(
          (tab) =>
            (!tab.adminOnly || (tab.adminOnly && isAdmin)) && (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-emerald-50 text-emerald-600" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
        )}
      </div>

      {/* Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Active Projects</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Completed Projects</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Team Members</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Avg. Rating</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">4.9</p>
                </div>
              </div>
            </div>

            {/* Team Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["React", "Solidity", "Web3.js", "TypeScript", "Node.js", "AWS", "Smart Contracts", "DeFi"].map(
                  (skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "members" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                {isAdmin && (
                  <button
                    onClick={() => setShowAddMemberModal(true)}
                    className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Member</span>
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {mockTeamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col md:flex-row md:items-start justify-between p-6 border rounded-lg"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                            member.status === "online" ? "bg-green-500" : "bg-gray-300"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {member.skills.map((skill, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{member.portfolio.projects}</p>
                          <p className="text-sm text-gray-600">Projects</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{member.portfolio.rating}</p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{member.portfolio.completionRate}%</p>
                          <p className="text-sm text-gray-600">Completion</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-4">
                        <button className="text-emerald-600 hover:text-emerald-700">View Portfolio</button>
                        {isAdmin && <button className="text-red-600 hover:text-red-700">Remove</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-6">
            {mockProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 mt-1">{project.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Started {new Date(project.startDate).toLocaleDateString()}
                  </span>
                  {project.endDate && (
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "settings" && isAdmin && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Team Settings</h2>

            <div className="space-y-6">
              {/* Team Information */}
              <div className="border-b pb-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Team Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                    <input
                      type="text"
                      defaultValue="Web3 Development Squad"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Description</label>
                    <input
                      type="text"
                      defaultValue="Specialized team focused on blockchain and DeFi development"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Team Visibility */}
              <div className="border-b pb-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Team Visibility</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      defaultChecked
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-900">Public - Anyone can find and request to join</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="visibility" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500" />
                    <span className="ml-2 text-gray-900">Private - Only invited members can join</span>
                  </label>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border-t pt-6">
                <h3 className="text-md font-medium text-red-600 mb-4">Danger Zone</h3>
                <div className="space-y-4">
                  <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    <span>Archive Team</span>
                  </button>
                  <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                    <Trash className="h-5 w-5" />
                    <span>Delete Team</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Add Member Modal */}
      <AddTeamMemberModal isOpen={showAddMemberModal} onClose={() => setShowAddMemberModal(false)} onInvite={handleInviteUser} />
    </div>
  );
}