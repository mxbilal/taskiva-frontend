"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Menu, ChevronDown, Briefcase, Users, Building2, Star, 
  MessageSquare, Clock, Settings, User, LogOut
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/context/auth';

export default function Header() {
  const { user, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const dropdownItems = {
    'Find Work': [
      { icon: Briefcase, label: 'Browse Jobs' },
      { icon: Users, label: 'Browse Teams' },
      { icon: Star, label: 'Saved Jobs' },
      { icon: Clock, label: 'Recent Searches' }
    ],
    'Find Talent': [
      { icon: Users, label: 'Browse Professionals' },
      { icon: Building2, label: 'Agency Listings' },
      { icon: MessageSquare, label: 'Project Requests' },
      { icon: Settings, label: 'Hiring Settings' }
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-emerald-600">
              taskiva
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {Object.keys(dropdownItems).map((item) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-800 hover:text-gray-900">
                  <span>{item}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {activeDropdown === item && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50"
                    >
                      {dropdownItems[item as keyof typeof dropdownItems].map((dropdownItem, index) => (
                        <Link
                          key={index}
                          href="#"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-800 hover:bg-gray-50"
                        >
                          <dropdownItem.icon className="h-5 w-5 text-gray-600" />
                          <span>{dropdownItem.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Search and Auth */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 text-gray-800 hover:text-gray-900"
              >
                <Search className="h-5 w-5" />
                {!isSearchOpen && <span>Search</span>}
              </button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 300 }}
                    exit={{ opacity: 0, width: 0 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 placeholder:text-gray-500"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user ? (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2"
                >
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </Link>
                      <Link
                        href="/dashboard/portfolio"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Portfolio
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Account Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-800 hover:text-gray-900">
                  Log In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}