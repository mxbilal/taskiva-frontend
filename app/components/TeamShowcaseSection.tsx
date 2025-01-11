"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function TeamShowcaseSection() {
  const teams = [
    {
      name: "Web3 Development Squad",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop&auto=format",
      members: 4,
      roles: ["Frontend Dev", "Smart Contract Dev", "UI Designer", "Project Manager"],
      description: "A dynamic team specializing in blockchain applications and DeFi solutions."
    },
    {
      name: "Creative Tech Studio",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop&auto=format",
      members: 3,
      roles: ["UX Designer", "Frontend Dev", "Motion Designer"],
      description: "Bringing creative visions to life through cutting-edge technology."
    },
    {
      name: "Mobile App Team",
      image: "https://images.unsplash.com/photo-1603201667141-5324c62cd28c?w=800&h=500&fit=crop&auto=format",
      members: 4,
      roles: ["iOS Dev", "Android Dev", "UI Designer", "QA Engineer"],
      description: "Creating seamless mobile experiences across platforms."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Teams</h2>
          <p className="text-xl text-gray-600">
            See how professionals are collaborating on Taskiva
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teams.map((team, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <img 
                src={team.image} 
                alt={team.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{team.name}</h3>
                <p className="text-gray-600 mb-4">{team.description}</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">{team.members} Members</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {team.roles.map((role, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}