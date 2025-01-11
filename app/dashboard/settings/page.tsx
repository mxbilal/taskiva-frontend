"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Bell, Lock, Globe, Shield,
  CreditCard, Mail, Smartphone, Eye,
  EyeOff, CheckCircle, AlertTriangle,
  Trash, LogOut
} from 'lucide-react';
import { useAuth } from '@/app/context/auth';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing'>('profile');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const inputClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-800";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
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

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              {/* Avatar Upload */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                    alt="Profile"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg">
                    <User className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Profile Photo</h3>
                  <p className="text-sm text-gray-500">
                    JPG, GIF or PNG. Max size of 800K
                  </p>
                  <button className="mt-2 text-sm text-emerald-600 hover:text-emerald-700">
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className={inputClasses}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="Senior Full Stack Developer with over 8 years of experience..."
                    className={inputClasses}
                  />
                </div>

                {user?.type === 'client' && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      defaultValue="TechCorp Solutions"
                      className={inputClasses}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select className={inputClasses}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Zone
                  </label>
                  <select className={inputClasses}>
                    <option>Pacific Time (PT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Central Time (CT)</option>
                    <option>Eastern Time (ET)</option>
                  </select>
                </div>

                {user?.type === 'talent' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability Status
                    </label>
                    <select className={inputClasses}>
                      <option>Available for Work</option>
                      <option>Open to Opportunities</option>
                      <option>Not Available</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
            
            <div className="space-y-6">
              {/* Email Notifications */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-3">
                      <span className="text-sm font-medium text-gray-900">New Messages</span>
                      <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-3">
                      <span className="text-sm font-medium text-gray-900">Project Updates</span>
                      <p className="text-sm text-gray-500">Receive updates about your projects</p>
                    </span>
                  </label>

                  {user?.type === 'talent' ? (
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-3">
                        <span className="text-sm font-medium text-gray-900">Job Recommendations</span>
                        <p className="text-sm text-gray-500">Get notified about new job opportunities</p>
                      </span>
                    </label>
                  ) : (
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-3">
                        <span className="text-sm font-medium text-gray-900">Talent Matches</span>
                        <p className="text-sm text-gray-500">Get notified about matching talent for your jobs</p>
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Push Notifications */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-3">
                      <span className="text-sm font-medium text-gray-900">Browser Notifications</span>
                      <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-3">
                      <span className="text-sm font-medium text-gray-900">Mobile Notifications</span>
                      <p className="text-sm text-gray-500">Receive notifications on your mobile device</p>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Password & Security</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={inputClasses}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className={inputClasses}
                  />
                </div>

                <div className="flex justify-end">
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
                  <p className="text-gray-600 mt-1">Add an extra layer of security to your account</p>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                  Enable 2FA
                </button>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-gray-400" />
                <span>Two-factor authentication is currently disabled</span>
              </div>
            </div>

            {/* Login History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Login History</h2>
              
              <div className="space-y-4">
                {[
                  { device: 'MacBook Pro', location: 'San Francisco, CA', time: '2 hours ago', current: true },
                  { device: 'iPhone 12', location: 'San Francisco, CA', time: '1 day ago' },
                  { device: 'Windows PC', location: 'San Jose, CA', time: '3 days ago' }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {session.device.includes('iPhone') ? (
                          <Smartphone className="h-5 w-5 text-gray-600" />
                        ) : (
                          <Globe className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {session.device}
                          {session.current && (
                            <span className="ml-2 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                              Current Session
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {session.location} • {session.time}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <button className="text-red-600 hover:text-red-700">
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                  <p className="text-gray-600 mt-1">Manage your payment methods and billing preferences</p>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                  Add Payment Method
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CreditCard className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• 4242</p>
                      <p className="text-sm text-gray-600">Expires 12/24</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      Default
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Billing History</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-medium text-gray-600">Date</th>
                      <th className="pb-3 font-medium text-gray-600">Description</th>
                      <th className="pb-3 font-medium text-gray-600">Amount</th>
                      <th className="pb-3 font-medium text-gray-600">Status</th>
                      <th className="pb-3 font-medium text-gray-600">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: '2024-03-01', description: 'Monthly Subscription', amount: 49.99, status: 'paid' },
                      { date: '2024-02-01', description: 'Monthly Subscription', amount: 49.99, status: 'paid' },
                      { date: '2024-01-01', description: 'Monthly Subscription', amount: 49.99, status: 'paid' }
                    ].map((invoice, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-4">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="py-4">{invoice.description}</td>
                        <td className="py-4">${invoice.amount}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-emerald-50 text-emerald-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Paid
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="text-emerald-600 hover:text-emerald-700">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h3 className="font-medium text-red-700">Deactivate Account</h3>
                <p className="text-sm text-red-600">Temporarily disable your account</p>
              </div>
              <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100">
                Deactivate
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h3 className="font-medium text-red-700">Delete Account</h3>
                <p className="text-sm text-red-600">Permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}