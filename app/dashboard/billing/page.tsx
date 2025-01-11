"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, Clock, Download, ChevronDown,
  DollarSign, AlertCircle, CheckCircle, Plus,
  FileText, Calendar
} from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  expiry?: string;
  name: string;
  isDefault: boolean;
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    date: '2024-03-01',
    amount: 499.99,
    status: 'paid',
    description: 'Monthly Subscription - March 2024'
  },
  {
    id: 'INV-2024-002',
    date: '2024-02-01',
    amount: 499.99,
    status: 'paid',
    description: 'Monthly Subscription - February 2024'
  }
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    expiry: '12/24',
    name: 'Visa ending in 4242',
    isDefault: true
  },
  {
    id: '2',
    type: 'paypal',
    name: 'PayPal Account',
    isDefault: false
  }
];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'payment-methods' | 'invoices'>('overview');

  const tabs = [
    { id: 'overview', label: 'Billing Overview', icon: DollarSign },
    { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard },
    { id: 'invoices', label: 'Invoices & History', icon: FileText }
  ];

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'text-emerald-600 bg-emerald-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-600">Manage your billing information and view payment history</p>
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
        {activeTab === 'overview' && (
          <>
            {/* Current Plan */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Current Plan</h3>
                  <p className="text-sm text-gray-600">Business Pro Plan</p>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                  Upgrade Plan
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Monthly Fee</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">$499.99</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Next Billing</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">Apr 1, 2024</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600">Active Until</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">Mar 31, 2024</p>
                </div>
              </div>
            </div>

            {/* Usage Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Active Job Posts</p>
                    <p className="text-sm text-gray-600">8 of 10 used</p>
                  </div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Team Connections</p>
                    <p className="text-sm text-gray-600">15 of 20 used</p>
                  </div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'payment-methods' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
              <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700">
                <Plus className="h-4 w-4" />
                <span>Add Payment Method</span>
              </button>
            </div>

            <div className="space-y-4">
              {mockPaymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <CreditCard className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      {method.expiry && (
                        <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {method.isDefault && (
                      <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                    <button className="text-gray-600 hover:text-emerald-600">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Invoice History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-medium text-gray-600">Invoice</th>
                      <th className="pb-3 font-medium text-gray-600">Date</th>
                      <th className="pb-3 font-medium text-gray-600">Amount</th>
                      <th className="pb-3 font-medium text-gray-600">Status</th>
                      <th className="pb-3 font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b last:border-0">
                        <td className="py-4">
                          <p className="font-medium text-gray-900">{invoice.id}</p>
                          <p className="text-sm text-gray-600">{invoice.description}</p>
                        </td>
                        <td className="py-4">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="py-4">${invoice.amount.toFixed(2)}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="text-emerald-600 hover:text-emerald-700">
                            Download PDF
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
      </motion.div>
    </div>
  );
}