"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Calendar,
  Download,
  ChevronDown,
  TrendingUp,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import { SpendingChart } from "@/app/components/charts/SpendingChart";

interface Transaction {
  id: string;
  type: "payment" | "withdrawal";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  description: string;
  project?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "payment",
    amount: 2500,
    date: "2024-03-01",
    status: "completed",
    description: "Project milestone payment",
    project: "E-commerce Platform Development",
  },
  {
    id: "2",
    type: "withdrawal",
    amount: 1800,
    date: "2024-02-28",
    status: "completed",
    description: "Bank transfer",
  },
  {
    id: "3",
    type: "payment",
    amount: 1200,
    date: "2024-02-25",
    status: "completed",
    description: "Project completion bonus",
    project: "Mobile App UI Design",
  },
  {
    id: "4",
    type: "payment",
    amount: 3000,
    date: "2024-02-20",
    status: "pending",
    description: "Project milestone payment",
    project: "Web Application Development",
  },
];

const earningsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  amounts: [4500, 5200, 4800, 5800, 4900, 5600],
};

export default function EarningsPage() {
  const [dateRange, setDateRange] = useState("last-6-months");
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "payouts">("overview");

  const tabs = [
    { id: "overview", label: "Earnings Overview" },
    { id: "transactions", label: "Transactions" },
    { id: "payouts", label: "Payout Settings" },
  ];

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "text-emerald-600 bg-emerald-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "pending":
        return Clock;
      case "failed":
        return AlertCircle;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings & Payments</h1>
          <p className="text-gray-600">Track your income and manage payouts</p>
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
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-emerald-600" />
            <span className="text-sm text-emerald-600 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              12.5%
            </span>
          </div>
          <h4 className="text-2xl font-bold text-gray-900">$15,890</h4>
          <p className="text-gray-600">Total Earnings</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="h-8 w-8 text-emerald-600" />
            <span className="text-sm text-emerald-600 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              8.2%
            </span>
          </div>
          <h4 className="text-2xl font-bold text-gray-900">$4,550</h4>
          <p className="text-gray-600">Available Balance</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
            <span className="text-sm text-emerald-600 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              15.3%
            </span>
          </div>
          <h4 className="text-2xl font-bold text-gray-900">$2,890</h4>
          <p className="text-gray-600">This Month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-emerald-600" />
            <span className="text-sm text-emerald-600">Next Payout</span>
          </div>
          <h4 className="text-2xl font-bold text-gray- 900">Mar 15</h4>
          <p className="text-gray-600">$1,250 estimated</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id ? "bg-emerald-50 text-emerald-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {activeTab === "overview" && (
          <>
            {/* Earnings Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Earnings History</h2>
              <div className="h-80">
                <SpendingChart data={earningsData} />
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm">View All</button>
              </div>
              <div className="space-y-4">
                {mockTransactions.slice(0, 3).map((transaction) => {
                  const StatusIcon = getStatusIcon(transaction.status);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "payment" ? "bg-emerald-100" : "bg-blue-100"
                          }`}
                        >
                          {transaction.type === "payment" ? (
                            <ArrowDownRight
                              className={`h-5 w-5 ${
                                transaction.type === "payment" ? "text-emerald-600" : "text-blue-600"
                              }`}
                            />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          {transaction.project && <p className="text-sm text-gray-600">{transaction.project}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${
                            transaction.type === "payment" ? "text-emerald-600" : "text-blue-600"
                          }`}
                        >
                          {transaction.type === "payment" ? "+" : "-"}${transaction.amount}
                        </p>
                        <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-medium text-gray-600">Transaction</th>
                      <th className="pb-3 font-medium text-gray-600">Amount</th>
                      <th className="pb-3 font-medium text-gray-600">Date</th>
                      <th className="pb-3 font-medium text-gray-600">Status</th>
                      <th className="pb-3 font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map((transaction) => {
                      const StatusIcon = getStatusIcon(transaction.status);
                      return (
                        <tr key={transaction.id} className="border-b last:border-0">
                          <td className="py-4">
                            <div>
                              <p className="font-medium text-gray-900">{transaction.description}</p>
                              {transaction.project && <p className="text-sm text-gray-600">{transaction.project}</p>}
                            </div>
                          </td>
                          <td className="py-4">
                            <span className={transaction.type === "payment" ? "text-emerald-600" : "text-blue-600"}>
                              {transaction.type === "payment" ? "+" : "-"}${transaction.amount}
                            </span>
                          </td>
                          <td className="py-4">{new Date(transaction.date).toLocaleDateString()}</td>
                          <td className="py-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${getStatusColor(
                                transaction.status
                              )}`}
                            >
                              <StatusIcon className="h-4 w-4 mr-1" />
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4">
                            <button className="text-emerald-600 hover:text-emerald-700">View Details</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payouts" && (
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Bank Account</p>
                      <p className="text-sm text-gray-600">****6789 • Checking Account</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Default</span>
                    <button className="text-gray-600 hover:text-emerald-600">Edit</button>
                  </div>
                </div>

                <button className="w-full p-4 border-2 border-dashed rounded-lg text-gray-600 hover:text-emerald-600 hover:border-emerald-500 flex items-center justify-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add Payment Method</span>
                </button>
              </div>
            </div>

            {/* Payout Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Payout Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payout Schedule</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Payout Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      defaultValue={100}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
