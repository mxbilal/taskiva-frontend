"use client";

import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

// Mock job data and props interface
interface Job {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

interface JobApplicationProps {
  job: Job;
}

interface FormData {
  coverLetter: string;
  rate: string;
  availability: string;
  paymentType: 'hourly' | 'fixed';
  duration: string;
  attachments: File[];
}

const JobApplicationForm: React.FC<JobApplicationProps> = ({ job }) => {
  const [formData, setFormData] = useState<FormData>({
    coverLetter: '',
    rate: '',
    availability: '',
    paymentType: 'hourly',
    duration: '',
    attachments: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting application:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-6">
      {/* Add form fields here as in the original component */}
      <h1 className="text-2xl font-bold">{job.title}</h1>
      {/* More form fields and the Submit button */}
    </form>
  );
};

export default JobApplicationForm;
