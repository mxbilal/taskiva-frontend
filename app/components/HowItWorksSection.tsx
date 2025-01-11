"use client";

import React from 'react';
import { UserPlus, Users, Boxes, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Multiple Profiles",
      description: "Set up different professional profiles showcasing your various skills and roles. Be a developer, designer, or project manager.",
      features: [
        "Showcase different skill sets",
        "Highlight role-specific experience",
        "Maintain separate portfolios"
      ]
    },
    {
      icon: Users,
      title: "Join or Create Teams",
      description: "Find your perfect match or build your dream team from scratch. Collaborate with professionals who complement your skills.",
      features: [
        "Form dynamic teams",
        "Join existing projects",
        "Collaborate across roles"
      ]
    },
    {
      icon: Boxes,
      title: "Manage Projects",
      description: "Take on projects as an individual or as part of a team. Switch between roles seamlessly based on project requirements.",
      features: [
        "Handle multiple projects",
        "Switch roles flexibly",
        "Scale your involvement"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Your journey from solo professional to dynamic team player starts here
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-emerald-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <step.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <ArrowRight className="h-4 w-4 text-emerald-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px bg-gray-300" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}