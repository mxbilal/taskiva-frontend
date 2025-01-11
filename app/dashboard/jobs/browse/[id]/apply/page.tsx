"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Building2, MapPin, Briefcase, 
  DollarSign, Clock, Users, Send, AlertCircle,
  FileText, Plus, X
} from 'lucide-react';
import Link from 'next/link';

interface JobDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  budget: string;
  posted: string;
  description: string;
  skills: string[];
  applicants: number;
}

const mockJob: JobDetails = {
  id: '1',
  title: 'Senior Full Stack Developer',
  company: 'TechCorp Solutions',
  location: 'Remote',
  type: 'Full-time',
  budget: '$120k - $150k/year',
  posted: '2 hours ago',
  description: 'We are looking for an experienced Full Stack Developer to join our growing team. The ideal candidate will have strong experience with React, Node.js, and cloud technologies...',
  skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
  applicants: 12
};

export default function JobApplicationPage({ params }: { params: { id: string } }) {
  const [paymentType, setPaymentType] = useState<'hourly' | 'fixed'>('hourly');
  const [rate, setRate] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: '1',
      title: 'Full Stack Developer Template',
      content: 'I am writing to express my strong interest in the Full Stack Developer position...'
    },
    {
      id: '2',
      title: 'Senior Developer Template',
      content: 'With over 8 years of experience in full-stack development...'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle application submission
    console.log({
      paymentType,
      rate,
      coverLetter,
      attachments
    });
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setCoverLetter(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const addAttachment = () => {
    // In a real app, this would open a file picker
    const mockFile = `Portfolio-${attachments.length + 1}.pdf`;
    setAttachments([...attachments, mockFile]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  // Common styles
  const inputClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400";
  const radioClasses = "h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/jobs/browse"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Jobs
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Submit a Proposal</h1>
        <p className="text-gray-600">Apply for: {mockJob.title}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Application Form */}
        <div className="col-span-2 space-y-6">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Payment Type */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Type
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={paymentType === 'hourly'}
                        onChange={() => setPaymentType('hourly')}
                        className={radioClasses}
                      />
                      <span className="text-gray-800">Hourly Rate</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={paymentType === 'fixed'}
                        onChange={() => setPaymentType('fixed')}
                        className={radioClasses}
                      />
                      <span className="text-gray-800">Project Budget</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {paymentType === 'hourly' ? 'Hourly Rate' : 'Project Budget'}
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder={paymentType === 'hourly' ? 'Enter hourly rate' : 'Enter project budget'}
                      className={`${inputClasses} pl-10`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Cover Letter</h2>
                <div className="relative">
                  <select
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    value={selectedTemplate || ''}
                    className={inputClasses}
                  >
                    <option value="">Select Template</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <textarea
                rows={8}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write your cover letter..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Attachments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Attachments</h2>
                <button
                  type="button"
                  onClick={addAttachment}
                  className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add File</span>
                </button>
              </div>
              
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg bg-white"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-800">{file}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Submit Proposal</span>
              </button>
            </div>
          </motion.form>
        </div>

        {/* Job Details Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-medium text-gray-900">{mockJob.title}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Building2 className="h-4 w-4 mr-1" />
                    {mockJob.company}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mockJob.location}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>{mockJob.type}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{mockJob.budget}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Posted {mockJob.posted}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{mockJob.applicants} applicants</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {mockJob.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Job Description</h4>
                <p className="text-gray-600 text-sm">{mockJob.description}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Application Tips</h4>
                <ul className="mt-2 text-sm text-yellow-700 list-disc pl-4 space-y-1">
                  <li>Highlight relevant experience</li>
                  <li>Be specific about your skills</li>
                  <li>Explain why you're a good fit</li>
                  <li>Proofread before submitting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}