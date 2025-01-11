"use client";

import React from 'react';
import { Users, Briefcase, UserPlus, Boxes, Workflow, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyUsSection() {
  const features = [
    {
      icon: Users,
      title: "Dynamic Team Formation",
      description: "Unlike traditional platforms where you work solo, Taskiva lets you form or join teams based on project needs."
    },
    {
      icon: Briefcase,
      title: "Multiple Role Management",
      description: "Switch seamlessly between different roles - be a developer in one team and a project manager in another."
    },
    {
      icon: Workflow,
      title: "Flexible Collaboration",
      description: "Work individually when you want, or team up with others for larger projects."
    },
    {
      icon: Target,
      title: "Skill Synergy",
      description: "Find complementary talents to create powerful teams that can tackle complex projects."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Taskiva?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing how freelancers work together. No more working in isolation - 
            build your network, join forces, and take on bigger opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="bg-emerald-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}