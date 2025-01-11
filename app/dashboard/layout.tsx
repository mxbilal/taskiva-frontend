"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, Bell, MessageSquare, User, 
  LogOut, Search, Grid, Briefcase, Users,
  FileText, Star, Settings, PlusCircle,
  ChevronDown, Building2, Wallet, BarChart,
  UserPlus, Folder, Award, Heart, ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/context/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSignOut = () => {
    logout();
  };

  const clientNavItems = [
    { icon: Grid, label: 'Overview', href: '/dashboard/client' },
    { icon: Briefcase, label: 'Post a Job', href: '/dashboard/jobs/post' },
    { icon: FileText, label: 'My Jobs', href: '/dashboard/jobs' },
    { icon: Users, label: 'Hired Teams', href: '/dashboard/teams' },
    { icon: Building2, label: 'Company', href: '/dashboard/company' },
    { icon: Wallet, label: 'Billing', href: '/dashboard/billing' },
    { icon: BarChart, label: 'Reports', href: '/dashboard/reports' },
  ];

  const talentNavItems = [
    { icon: Grid, label: 'Overview', href: '/dashboard/talent' },
    { icon: Briefcase, label: 'Find Work', href: '/dashboard/jobs/browse' },
    { icon: FileText, label: 'Proposals', href: '/dashboard/proposals' },
    { icon: UserPlus, label: 'My Teams', href: '/dashboard/my-teams' },
    { icon: Folder, label: 'Portfolio', href: '/dashboard/portfolio' },
    { icon: Award, label: 'Skills & Badges', href: '/dashboard/skills' },
    { icon: Heart, label: 'Saved Jobs', href: '/dashboard/saved' },
    { icon: Wallet, label: 'Earnings', href: '/dashboard/earnings' },
  ];

  const navItems = user?.type === 'client' ? clientNavItems : talentNavItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-2xl font-bold text-emerald-600">
                taskiva
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={user?.type === 'client' ? "Search teams..." : "Search jobs..."}
                  className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                />
              </div>
              
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <button>
                <MessageSquare className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </button>

              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2"
                >
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link 
                      href="/dashboard/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </Link>
                    {user?.type === 'talent' && (
                      <Link 
                        href="/dashboard/portfolio" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Portfolio
                      </Link>
                    )}
                    <Link 
                      href="/dashboard/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Account Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarCollapsed ? '64px' : '240px' }}
          className="fixed left-0 top-16 bottom-0 bg-white border-r z-20"
        >
          <div className="p-2 h-full flex flex-col">
            {/* Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 mb-4 self-end"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <nav className="flex-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 group mb-1"
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>

            <div className="pt-4 mt-4 border-t">
              <Link
                href="/dashboard/settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 group"
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span>Settings</span>}
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:bg-red-50 hover:text-red-600 group"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span>Sign Out</span>}
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}