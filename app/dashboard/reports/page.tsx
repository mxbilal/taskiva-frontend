"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, PieChart, TrendingUp, Download,
  Calendar, DollarSign, Users, Briefcase,
  ChevronDown, Filter, ArrowUp, ArrowDown
} from 'lucide-react';
import { SpendingChart } from '@/app/components/charts/SpendingChart';
import { CategoryChart } from '@/app/components/charts/CategoryChart';
import { HiringChart } from '@/app/components/charts/HiringChart';

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: any;
}

// Mock data for charts
const spendingData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  amounts: [4500, 5200, 4800, 5800, 4900, 5600]
};

const categoryData = {
  labels: ['Development', 'Design', 'Marketing', 'Content', 'Other'],
  amounts: [12000, 8000, 5000, 3000, 2000]
};

const hiringData = {
  labels: ['Web Dev', 'Design', 'Mobile Dev', 'DevOps', 'Marketing'],
  amounts: [35, 25, 20, 15, 5]
};

const mockStats: StatCard[] = [
  {
    title: 'Total Spend',
    value: '$24,500',
    change: 12.5,
    icon: DollarSign
  },
  {
    title: 'Active Teams',
    value: '8',
    change: 25,
    icon: Users
  },
  {
    title: 'Open Jobs',
    value: '12',
    change: -8.3,
    icon: Briefcase
  },
  {
    title: 'Avg. Time to Hire',
    value: '14 days',
    change: -15.2,
    icon: Calendar
  }
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('last-6-months');
  const [activeTab, setActiveTab] = useState<'overview' | 'spending' | 'hiring'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'spending', label: 'Spending Analysis', icon: DollarSign },
    { id: 'hiring', label: 'Hiring Metrics', icon: Users }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Track your hiring and spending metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="last-year">Last Year</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-emerald-600" />
              </div>
              <span className={`flex items-center text-sm ${
                stat.change >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {Math.abs(stat.change)}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Spending Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Spending Trends</h3>
                <button className="text-sm text-emerald-600 hover:text-emerald-700">
                  View Details
                </button>
              </div>
              <div className="h-64">
                <SpendingChart data={spendingData} />
              </div>
            </div>

            {/* Hiring Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Hiring Distribution</h3>
                <button className="text-sm text-emerald-600 hover:text-emerald-700">
                  View Details
                </button>
              </div>
              <div className="h-64">
                <HiringChart data={hiringData} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spending' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Detailed Spending Analysis</h3>
                <p className="text-sm text-gray-600">Track your spending patterns across different categories</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Monthly Spending Chart */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Monthly Spending</h4>
                <div className="h-64">
                  <SpendingChart data={spendingData} />
                </div>
              </div>

              {/* Category Distribution */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Spending by Category</h4>
                <div className="h-64">
                  <CategoryChart data={categoryData} />
                </div>
              </div>
            </div>

            {/* Spending Table */}
            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Recent Transactions</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-medium text-gray-600">Date</th>
                      <th className="pb-3 font-medium text-gray-600">Description</th>
                      <th className="pb-3 font-medium text-gray-600">Category</th>
                      <th className="pb-3 font-medium text-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((_, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-4">Mar {15 - index}, 2024</td>
                        <td className="py-4">Team Payment - Web Development</td>
                        <td className="py-4">Development</td>
                        <td className="py-4">$2,500.00</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hiring' && (
          <div className="space-y-6">
            {/* Hiring Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Average Time to Hire</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">14 days</p>
                  <p className="text-sm text-emerald-600 flex items-center mt-1">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    15.2% vs last period
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Offer Acceptance Rate</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">85%</p>
                  <p className="text-sm text-emerald-600 flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    5.3% vs last period
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Active Job Posts</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    8.3% vs last period
                  </p>
                </div>
              </div>
            </div>

            {/* Hiring Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Hiring Distribution by Role</h3>
              <div className="h-80">
                <HiringChart data={hiringData} />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}