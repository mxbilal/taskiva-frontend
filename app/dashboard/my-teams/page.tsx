"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Star, Clock, Briefcase, Building2,
  MessageSquare, Settings, ArrowRight, Plus,
  ChevronDown, Globe, Mail, CheckCircle, XCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

type TeamTab = 'joined' | 'created' | 'requests';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline';
}

interface JoinRequest {
  id: string;
  userId: string;
  teamId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  userSkills: string[];
  message: string;
  requestDate: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Team {
  id: string;
  name: string;
  description: string;
  type: 'joined' | 'created';
  role: string;
  members: TeamMember[];
  activeProjects: number;
  completedProjects: number;
  rating: number;
  skills: string[];
  lastActive: string;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Web3 Development Squad',
    description: 'Specialized team focused on blockchain and DeFi development',
    type: 'joined',
    role: 'Frontend Developer',
    members: [
      { id: '1', name: 'Sarah Chen', role: 'Team Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop', status: 'online' },
      { id: '2', name: 'Michael Park', role: 'Backend Dev', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop', status: 'offline' },
      { id: '3', name: 'Emma Wilson', role: 'UI Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop', status: 'online' }
    ],
    activeProjects: 2,
    completedProjects: 5,
    rating: 4.8,
    skills: ['React', 'Solidity', 'Web3.js', 'TypeScript'],
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Mobile Innovation Team',
    description: 'Cross-platform mobile app development team',
    type: 'created',
    role: 'Team Lead',
    members: [
      { id: '4', name: 'Alex Johnson', role: 'iOS Dev', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop', status: 'online' },
      { id: '5', name: 'Lisa Wang', role: 'Android Dev', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop', status: 'offline' }
    ],
    activeProjects: 1,
    completedProjects: 3,
    rating: 4.9,
    skills: ['React Native', 'iOS', 'Android', 'Firebase'],
    lastActive: '1 day ago'
  }
];

const mockJoinRequests: JoinRequest[] = [
  {
    id: '1',
    userId: 'user1',
    teamId: '1',
    userName: 'John Smith',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    userRole: 'Full Stack Developer',
    userSkills: ['React', 'Node.js', 'TypeScript'],
    message: 'I would love to join your team and contribute to your blockchain projects. I have experience with Web3 development.',
    requestDate: '2024-03-01',
    status: 'pending'
  },
  {
    id: '2',
    userId: 'user2',
    teamId: '1',
    userName: 'Emily Brown',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    userRole: 'Smart Contract Developer',
    userSkills: ['Solidity', 'Ethereum', 'Web3.js'],
    message: 'Looking to collaborate on DeFi projects. I have built several smart contracts and DApps.',
    requestDate: '2024-03-02',
    status: 'pending'
  }
];

export default function MyTeamsPage() {
  const [activeTab, setActiveTab] = useState<TeamTab>('joined');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'joined', label: 'Teams I\'ve Joined', icon: Users },
    { id: 'created', label: 'Teams I\'ve Created', icon: Star },
    { id: 'requests', label: 'Join Requests', icon: Clock }
  ];

  const filteredTeams = mockTeams.filter(team => 
    team.type === activeTab &&
    (searchQuery === '' || 
     team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     team.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRequestAction = (requestId: string, action: 'accept' | 'reject') => {
    // Handle request action
    console.log(`Request ${requestId} ${action}ed`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Teams</h1>
          <p className="text-gray-600">Manage your team collaborations and projects</p>
        </div>
        <button
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Team</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TeamTab)}
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

      {/* Search */}
      {activeTab !== 'requests' && (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Join Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          {mockJoinRequests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={request.userAvatar}
                    alt={request.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{request.userName}</h3>
                    <p className="text-sm text-gray-600">{request.userRole}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {request.userSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  Requested {new Date(request.requestDate).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-gray-600 text-sm">{request.message}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Requesting to join: <span className="font-medium text-gray-900">Web3 Development Squad</span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleRequestAction(request.id, 'reject')}
                    className="flex items-center space-x-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Decline</span>
                  </button>
                  <button
                    onClick={() => handleRequestAction(request.id, 'accept')}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Accept</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {mockJoinRequests.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No pending requests</h3>
              <p className="text-gray-600">
                You don't have any pending team join requests
              </p>
            </div>
          )}
        </div>
      )}

      {/* Teams List */}
      {activeTab !== 'requests' && (
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

                {/* Team Members */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-4">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <div className="relative">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                            member.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        </div>
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
                    Team Chat
                  </button>
                  <button className="flex items-center text-sm text-gray-600 hover:text-emerald-600">
                    <Settings className="h-4 w-4 mr-1" />
                    Settings
                  </button>
                </div>
                <Link
                  href={`/dashboard/teams/${team.id}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}

          {filteredTeams.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No teams found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? "No teams match your search criteria" 
                  : `You haven't ${activeTab === 'joined' ? 'joined' : 'created'} any teams yet`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}