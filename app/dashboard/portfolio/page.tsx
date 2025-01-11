"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Star, Clock, Briefcase, Building2,
  Globe, Mail, FileText, Link as LinkIcon,
  Edit, Trash, Award, Code, Palette,
  GraduationCap, Languages, MapPin, DollarSign
} from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  client: string;
  completedDate: string;
  skills: string[];
  images: string[];
  link?: string;
  feedback?: string;
  rating?: number;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  year: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    description: 'Developed a full-featured e-commerce platform with advanced search, real-time inventory, and payment processing.',
    client: 'TechCorp Solutions',
    completedDate: '2024-02',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    images: [
      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&h=500&fit=crop'
    ],
    link: 'https://example.com/project1',
    feedback: 'Excellent work! Delivered on time and exceeded expectations.',
    rating: 5
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Created user interface designs and user experience flows for a fitness tracking mobile application.',
    client: 'FitTech Inc',
    completedDate: '2024-01',
    skills: ['UI Design', 'Figma', 'Mobile Design', 'User Research'],
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop'
    ],
    feedback: 'Great attention to detail and very professional.',
    rating: 4.8
  }
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'education'>('overview');
  const [editMode, setEditMode] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills & Expertise' },
    { id: 'education', label: 'Education' }
  ];

  const skills = {
    technical: [
      { name: 'React', level: 'Expert', years: 5 },
      { name: 'Node.js', level: 'Expert', years: 4 },
      { name: 'TypeScript', level: 'Expert', years: 3 },
      { name: 'Python', level: 'Intermediate', years: 2 }
    ],
    design: [
      { name: 'UI Design', level: 'Expert', years: 4 },
      { name: 'User Research', level: 'Intermediate', years: 2 }
    ],
    soft: [
      'Project Management',
      'Team Leadership',
      'Communication',
      'Problem Solving'
    ]
  };

  const education: Education[] = [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      year: '2020'
    }
  ];

  const certifications: Certification[] = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: 'https://example.com/cert1'
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google',
      date: '2023',
      link: 'https://example.com/cert2'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                alt="Profile"
                className="w-32 h-32 rounded-lg object-cover"
              />
              {editMode && (
                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium text-gray-900">4.9</span>
                  <span className="text-gray-700 ml-1">(25 reviews)</span>
                </div>
              </div>
              <p className="text-lg text-gray-600 mt-1">Senior Full Stack Developer</p>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  San Francisco, CA
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
            <h4 className="text-sm font-medium text-gray-600">Projects Completed</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">25</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600">Hours Worked</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">1,250+</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600">Success Rate</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">98%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600">Hourly Rate</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">$85/hr</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
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
              <p className="text-gray-600">
                Senior Full Stack Developer with over 8 years of experience in building scalable web applications.
                Specialized in React, Node.js, and cloud technologies. Passionate about creating efficient,
                maintainable code and mentoring junior developers.
              </p>
            </div>

            {/* Featured Projects */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Featured Projects</h2>
                <Link
                  href="#projects"
                  className="text-emerald-600 hover:text-emerald-700 text-sm"
                >
                  View All Projects
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {mockProjects.slice(0, 2).map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-lg overflow-hidden hover:border-emerald-500 transition-colors"
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Skills & Expertise</h2>
                <Link
                  href="#skills"
                  className="text-emerald-600 hover:text-emerald-700 text-sm"
                >
                  View All Skills
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...skills.technical, ...skills.design].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            {editMode && (
              <div className="flex justify-end">
                <Link
                  href="/dashboard/portfolio/add-project"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Project</span>
                </Link>
              </div>
            )}
            
            {mockProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-gray-600 mt-1">{project.description}</p>
                      </div>
                      {editMode && (
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-emerald-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        {project.client}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {project.completedDate}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {project.feedback && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{project.rating}</span>
                        </div>
                        <p className="text-gray-600 text-sm italic">"{project.feedback}"</p>
                      </div>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-emerald-600 hover:text-emerald-700"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        <span>View Project</span>
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Technical Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Technical Skills</h2>
                  <p className="text-gray-600">Programming languages and frameworks</p>
                </div>
                {editMode && (
                  <button className="text-emerald-600 hover:text-emerald-700">
                    <Edit className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {skills.technical.map((skill, index) => (
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

            {/* Design Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Design Skills</h2>
                  <p className="text-gray-600">UI/UX and design tools</p>
                </div>
                {editMode && (
                  <button className="text-emerald-600 hover:text-emerald-700">
                    <Edit className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {skills.design.map((skill, index) => (
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

            {/* Soft Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Soft Skills</h2>
                  <p className="text-gray-600">Professional and interpersonal abilities</p>
                </div>
                {editMode && (
                  <button className="text-emerald-600 hover:text-emerald-700">
                    <Edit className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            {/* Education */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Education</h2>
                  <p className="text-gray-600">Academic background and qualifications</p>
                </div>
                {editMode && (
                  <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700">
                    <Plus className="h-4 w-4" />
                    <span>Add Education</span>
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{edu.school}</h3>
                        <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                        <p className="text-sm text-gray-600 mt-1">Graduated {edu.year}</p>
                      </div>
                    </div>
                    {editMode && (
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-emerald-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
                  <p className="text-gray-600">Professional certifications and achievements</p>
                </div>
                {editMode && (
                  <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700">
                    <Plus className="h-4 w-4" />
                    <span>Add Certification</span>
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Award className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{cert.name}</h3>
                        <p className="text-gray-600">{cert.issuer}</p>
                        <p className="text-sm text-gray-600 mt-1">Issued {cert.date}</p>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center mt-2"
                          >
                            <LinkIcon className="h-4 w-4 mr-1" />
                            View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                    {editMode && (
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-emerald-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}