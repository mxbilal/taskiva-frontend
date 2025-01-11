"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash, Upload } from 'lucide-react';
import Link from 'next/link';

export default function AddProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    startDate: '',
    endDate: '',
    skills: [] as string[],
    skillInput: '',
    projectUrl: '',
    images: [] as string[]
  });

  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && formData.skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(formData.skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, formData.skillInput.trim()],
          skillInput: ''
        });
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const inputClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Link
          href="/dashboard/portfolio"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Portfolio
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputClasses}
                placeholder="e.g., E-commerce Platform Development"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={inputClasses}
                placeholder="Describe the project, your role, and key achievements..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client/Company
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className={inputClasses}
                placeholder="e.g., TechCorp Solutions"
                required
              />
            </div>
          </div>

          {/* Project Timeline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills Used
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={formData.skillInput}
              onChange={(e) => setFormData({ ...formData, skillInput: e.target.value })}
              onKeyDown={handleSkillInput}
              className={inputClasses}
              placeholder="Type a skill and press Enter"
            />
          </div>

          {/* Project URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project URL (Optional)
            </label>
            <input
              type="url"
              value={formData.projectUrl}
              onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
              className={inputClasses}
              placeholder="e.g., https://example.com/project"
            />
          </div>

          {/* Project Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Images
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Project screenshot ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...formData.images];
                      newImages.splice(index, 1);
                      setFormData({ ...formData, images: newImages });
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
              >
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-sm">Upload Image</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/dashboard/portfolio"
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 text-gray-600"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}