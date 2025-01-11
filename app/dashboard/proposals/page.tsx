"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Plus, Star, Clock, CheckCircle,
  AlertCircle, Edit, Trash, Search, Filter
} from 'lucide-react';

type ProposalStatus = 'pending' | 'accepted' | 'rejected';
type ProposalTab = 'active' | 'archived' | 'templates';

interface Proposal {
  id: string;
  jobTitle: string;
  company: string;
  submittedDate: string;
  status: ProposalStatus;
  amount: string;
  coverLetter: string;
}

interface Template {
  id: string;
  title: string;
  category: string;
  content: string;
  lastUsed?: string;
}

const mockProposals: Proposal[] = [
  {
    id: '1',
    jobTitle: 'Senior React Developer',
    company: 'TechCorp Solutions',
    submittedDate: '2024-03-01',
    status: 'pending',
    amount: '$75/hour',
    coverLetter: 'I am writing to express my interest...'
  },
  {
    id: '2',
    jobTitle: 'Full Stack Engineer',
    company: 'StartUp Inc',
    submittedDate: '2024-02-28',
    status: 'accepted',
    amount: '$85/hour',
    coverLetter: 'With over 5 years of experience...'
  }
];

const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Full Stack Developer Introduction',
    category: 'Development',
    content: 'As a Full Stack Developer with extensive experience...',
    lastUsed: '2 days ago'
  },
  {
    id: '2',
    title: 'UI/UX Designer Pitch',
    category: 'Design',
    content: 'With a passion for creating intuitive user experiences...',
    lastUsed: '1 week ago'
  }
];

export default function ProposalsPage() {
  const [activeTab, setActiveTab] = useState<ProposalTab>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Omit<Template, 'id'>>({
    title: '',
    category: '',
    content: ''
  });

  const tabs = [
    { id: 'active', label: 'Active Proposals', icon: FileText },
    { id: 'archived', label: 'Archived', icon: Clock },
    { id: 'templates', label: 'Templates', icon: Star }
  ];

  const getStatusColor = (status: ProposalStatus) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'accepted':
        return 'text-emerald-600 bg-emerald-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
          <p className="text-gray-600">Track and manage your job proposals</p>
        </div>
        {activeTab === 'templates' && (
          <button
            onClick={() => setShowTemplateForm(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Template</span>
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === 'templates' ? "Search templates..." : "Search proposals..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ProposalTab)}
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

      {/* Templates Section */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          {showTemplateForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Template</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template Title
                  </label>
                  <input
                    type="text"
                    value={newTemplate.title}
                    onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    placeholder="e.g., Full Stack Developer Introduction"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    placeholder="e.g., Development, Design, Marketing"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    rows={6}
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    placeholder="Write your template content here..."
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowTemplateForm(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle save template
                      setShowTemplateForm(false);
                    }}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                  >
                    Save Template
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Template List */}
          <div className="grid md:grid-cols-2 gap-6">
            {mockTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{template.title}</h3>
                    <p className="text-sm text-gray-600">{template.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-600 hover:text-emerald-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-red-600">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{template.content}</p>
                {template.lastUsed && (
                  <p className="text-sm text-gray-500">
                    Last used {template.lastUsed}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Proposals List */}
      {(activeTab === 'active' || activeTab === 'archived') && (
        <div className="space-y-4">
          {mockProposals.map((proposal) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{proposal.jobTitle}</h3>
                  <p className="text-sm text-gray-600">{proposal.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(proposal.status)}`}>
                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{proposal.coverLetter}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Submitted {new Date(proposal.submittedDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    {proposal.amount}
                  </span>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}