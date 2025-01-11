"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash, User, Users } from "lucide-react";
import Link from "next/link";

interface TeamMember {
  role: string;
  skills: string[];
  description: string;
}

export default function CreateTeamPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    skills: [] as string[],
    skillInput: "",
    visibility: "public",
    members: [] as TeamMember[],
  });

  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(formData.skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, formData.skillInput.trim()],
          skillInput: "",
        });
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const addMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { role: "", skills: [], description: "" }],
    });
  };

  const removeMember = (index: number) => {
    const newMembers = [...formData.members];
    newMembers.splice(index, 1);
    setFormData({ ...formData, members: newMembers });
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string | string[]) => {
    const newMembers: any = [...formData.members];
    if (field === "skills" && typeof value === "string") {
      newMembers[index].skills = value.split(",").map((s) => s.trim());
    } else {
      newMembers[index][field] = value as string;
    }
    setFormData({ ...formData, members: newMembers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const inputClasses =
    "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/dashboard/teams" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Teams
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Team</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
                placeholder="e.g., Web3 Development Squad"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={inputClasses}
                placeholder="Describe your team's focus, goals, and expertise..."
                required
              />
            </div>
          </div>

          {/* Team Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Skills</label>
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

          {/* Team Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Visibility</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="public"
                  checked={formData.visibility === "public"}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-900">Public - Anyone can find and request to join</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="private"
                  checked={formData.visibility === "private"}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-900">Private - Only invited members can join</span>
              </label>
            </div>
          </div>

          {/* Team Members */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Team Members</label>
              <button
                type="button"
                onClick={addMember}
                className="text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add Member</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.members.map((member, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-900">Member {index + 1}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => updateMember(index, "role", e.target.value)}
                        className={inputClasses}
                        placeholder="e.g., Frontend Developer"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                      <input
                        type="text"
                        value={member.skills.join(", ")}
                        onChange={(e) => updateMember(index, "skills", e.target.value)}
                        className={inputClasses}
                        placeholder="e.g., React, TypeScript, Node.js"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role Description</label>
                      <textarea
                        value={member.description}
                        onChange={(e) => updateMember(index, "description", e.target.value)}
                        className={inputClasses}
                        rows={3}
                        placeholder="Describe the responsibilities and requirements for this role..."
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              {formData.members.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Add team members to get started</p>
                  <button type="button" onClick={addMember} className="mt-2 text-emerald-600 hover:text-emerald-700">
                    Add First Member
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/dashboard/teams" className="px-6 py-2 border rounded-lg hover:bg-gray-50 text-gray-600">
              Cancel
            </Link>
            <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
