"use client";

import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowRight } from 'lucide-react';

export default function Footer() {
  const footerSections = {
    'For Professionals': [
      'Create Multiple Roles',
      'Join Teams',
      'Build Your Team',
      'Success Stories',
      'Professional Development',
      'Skill Assessments',
      'Role Templates',
      'Team Formation Guide'
    ],
    'For Teams': [
      'Browse Talent Pool',
      'Team Management',
      'Collaboration Tools',
      'Project Showcase',
      'Team Analytics',
      'Resource Planning',
      'Team Building Resources',
      'Success Metrics'
    ],
    'Resources': [
      'Community Forums',
      'Blog & Insights',
      'Case Studies',
      'Webinars',
      'Help Center',
      'API Documentation',
      'Partner Program',
      'Platform Updates'
    ],
    'Company': [
      'About Us',
      'Careers',
      'Press',
      'Contact',
      'Trust & Safety',
      'Terms of Service',
      'Privacy Policy',
      'Accessibility'
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Join our newsletter</h3>
              <p className="text-gray-400">Stay updated with the latest team collaboration strategies and platform features</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-r-lg hover:bg-emerald-700 flex items-center">
                Subscribe <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerSections).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-800 mt-16 pt-16">
          <div>
            <div className="text-3xl font-bold text-white mb-2">2M+</div>
            <div className="text-gray-400">Professional Profiles</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-400">Active Teams</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">100+</div>
            <div className="text-gray-400">Countries</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-emerald-500">taskiva</h2>
              <span className="text-gray-400">© 2024 Taskiva. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}