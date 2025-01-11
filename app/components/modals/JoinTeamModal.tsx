"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, Briefcase, CheckCircle, Users } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  rating: number;
  skills: string[];
  openPositions: string[];
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Web3 Development Squad',
    description: 'Specialized team focused on blockchain and DeFi development',
    members: 4,
    rating: 4.8,
    skills: ['React', 'Solidity', 'Web3.js', 'TypeScript'],
    openPositions: ['Frontend Developer', 'Smart Contract Developer']
  },
  {
    id: '2',
    name: 'Mobile Innovation Team',
    description: 'Cross-platform mobile app development team',
    members: 3,
    rating: 4.7,
    skills: ['React Native', 'iOS', 'Android', 'Firebase'],
    openPositions: ['Mobile Developer', 'UI Designer']
  }
];

interface JoinTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinRequest: (teamId: string) => void;
}

export default function JoinTeamModal({ isOpen, onClose, onJoinRequest }: JoinTeamModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [requestedTeams, setRequestedTeams] = useState<string[]>([]);

  const allSkills = Array.from(
    new Set(mockTeams.flatMap(team => team.skills))
  );

  const filteredTeams = mockTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 ||
                         selectedSkills.some(skill => team.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  const handleJoinRequest = (teamId: string) => {
    setRequestedTeams([...requestedTeams, teamId]);
    onJoinRequest(teamId);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
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
                <h2 className="text-xl font-semibold text-gray-900">Join a Team</h2>
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
                    placeholder="Search teams by name or description..."
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

              {/* Team List */}
              <div className="max-h-[400px] overflow-y-auto p-6">
                <div className="space-y-4">
                  {filteredTeams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:border-emerald-500 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{team.name}</h3>
                            <p className="text-sm text-gray-600">{team.description}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium">{team.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {team.members} members
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {team.openPositions.length} open positions
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {team.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-gray-900">Open Positions:</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {team.openPositions.map((position, index) => (
                              <span
                                key={index}
                                className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs"
                              >
                                {position}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        {requestedTeams.includes(team.id) ? (
                          <span className="flex items-center text-emerald-600 text-sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Request Sent
                          </span>
                        ) : (
                          <button
                            onClick={() => handleJoinRequest(team.id)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                          >
                            Send Request
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