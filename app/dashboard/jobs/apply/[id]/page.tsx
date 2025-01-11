import React from "react";

// Mock job data (replace this with your actual data source if needed)
const mockJobs = [
  { id: "1", title: "Senior Full Stack Developer" },
  { id: "2", title: "Junior Backend Developer" },
  { id: "3", title: "UI/UX Designer" },
];

// Generate static parameters for this dynamic route
export async function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id, // Ensure this matches the `[id]` dynamic segment
  }));
}

export default function JobApplicationPage({ params }: { params: { id: string } }) {
  const job = mockJobs.find((job) => job.id === params.id);

  if (!job) {
    return (
      <div>
        <h1>Job Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>Details for {job.title}</p>
    </div>
  );
}
