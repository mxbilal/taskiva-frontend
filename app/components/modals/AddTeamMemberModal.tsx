"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, Briefcase, CheckCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
  rating: number;
  completedProjects: number;
  status: 'available' | 'busy' | 'offline';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    role: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'TypeScript'],
    rating: 4.8,
    completedProjects: 25,
    status: 'available'
  },
  {
    id: '2',
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    role: 'UI/UX Designer',
    skills: ['Figma', 'Adobe XD', 'User Research'],
    rating: 4.9,
    completedProjects: 18,
    status: 'busy'
  },
  {
    id: '3',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    role: 'Backend Developer',
    skills: ['Python', 'Django', 'PostgreSQL'],
    rating: 4.7,
    completedProjects: 15,
    status: 'available'
  }
];

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (userId: string) => void;
}

export default function AddTeamMemberModal({ isOpen, onClose, onInvite }: AddTeamMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);

  const allSkills = Array.from(
    new Set(mockUsers.flatMap(user => user.skills))
  );

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 ||
                         selectedSkills.some(skill => user.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  const handleInvite = (userId: string) => {
    setInvitedUsers([...invitedUsers, userId]);
    onInvite(userId);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'available':
        return 'text-emerald-600 bg-emerald-50';
      case 'busy':
        return 'text-yellow-600 bg-yellow-50';
      case 'offline':
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl relative z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Add Team Member</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search and Filters */}
              <div className="p-6 border-b">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedSkills.includes(skill)
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* User List */}
              <div className="max-h-[400px] overflow-y-auto p-6">
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:border-emerald-500 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.role}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm">
                            <span className="flex items-center text-gray-600">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              {user.rating}
                            </span>
                            <span className="flex items-center text-gray-600">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {user.completedProjects} projects
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {user.skills.map((skill, index) => (
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
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                        {invitedUsers.includes(user.id) ? (
                          <span className="flex items-center text-emerald-600 text-sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Invited
                          </span>
                        ) : (
                          <button
                            onClick={() => handleInvite(user.id)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                          >
                            Invite
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}