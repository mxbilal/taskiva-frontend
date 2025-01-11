"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, MapPin, Globe, Briefcase,
  Star, Clock, CheckCircle, Edit, Plus,
  FileText, Code, Award, Book, Languages
} from 'lucide-react';
import Link from 'next/link';

interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  website: string;
  bio: string;
  hourlyRate: string;
  availability: string;
  languages: string[];
  skills: {
    name: string;
    level: string;
    years: number;
  }[];
  education: {
    school: string;
    degree: string;
    field: string;
    year: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
}

const mockProfile: ProfileData = {
  name: "Sarah Johnson",
  title: "Senior Full Stack Developer",
  location: "San Francisco, CA",
  email: "sarah@example.com",
  website: "www.sarahjohnson.dev",
  bio: "Passionate full stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Strong focus on clean code and performance optimization.",
  hourlyRate: "$85/hour",
  availability: "Available for projects",
  languages: ["English (Native)", "Spanish (Professional)", "French (Basic)"],
  skills: [
    { name: "React", level: "Expert", years: 6 },
    { name: "Node.js", level: "Expert", years: 5 },
    { name: "TypeScript", level: "Expert", years: 4 },
    { name: "AWS", level: "Advanced", years: 3 }
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      year: "2016"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2023"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      year: "2022"
    }
  ],
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2020 - Present",
      description: "Leading development of enterprise web applications using React and Node.js. Mentoring junior developers and implementing best practices."
    },
    {
      title: "Full Stack Developer",
      company: "StartUp Inc",
      period: "2018 - 2020",
      description: "Developed and maintained multiple web applications. Implemented new features and optimized performance."
    }
  ]
};

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(mockProfile);

  const inputClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-800";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                alt={profile.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              {editMode && (
                <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium text-gray-900">4.9</span>
                  <span className="text-gray-600 ml-1">(25 reviews)</span>
                </div>
              </div>
              <p className="text-lg text-gray-600 mt-1">{profile.title}</p>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profile.location}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Member since 2020
                </span>
              </div>
              <div className="flex space-x-4 mt-4">
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-900 font-medium">
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-900 font-medium">
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </button>
              </div>
            </div>
          </div>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600">Success Rate</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">98%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600">Projects</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">45+</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600">Hours</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">2,500+</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600">Hourly Rate</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">{profile.hourlyRate}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* About */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold text-gray-900">About Me</h2>
            {editMode && (
              <button className="text-emerald-600 hover:text-emerald-700">
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-gray-600">{profile.bio}</p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Skills & Expertise</h2>
            {editMode && (
              <button className="text-emerald-600 hover:text-emerald-700">
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {profile.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{skill.name}</h3>
                  <p className="text-sm text-gray-600">{skill.level}</p>
                </div>
                <span className="text-sm text-gray-600">{skill.years} years</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
            {editMode && (
              <button className="text-emerald-600 hover:text-emerald-700">
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">{exp.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Education & Certifications</h2>
            {editMode && (
              <button className="text-emerald-600 hover:text-emerald-700">
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Education */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Education</h3>
              {profile.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border rounded-lg"
                >
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Book className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{edu.school}</h4>
                    <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-gray-600 mt-1">Graduated {edu.year}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Certifications</h3>
              {profile.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border rounded-lg mb-4 last:mb-0"
                >
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Award className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-600 mt-1">Issued {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Languages</h2>
            {editMode && (
              <button className="text-emerald-600 hover:text-emerald-700">
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            {profile.languages.map((language, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 border rounded-lg"
              >
                <Languages className="h-5 w-5 text-gray-600" />
                <span className="text-gray-900">{language}</span>
              </div>
            ))}
          </div>
        </div>

        {editMode && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setEditMode(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}