// app/dashboard/jobs/apply/[id]/generateStaticParams.ts

// Mock job data that would normally come from an API
const mockJobs = [
  { id: "1", title: "Senior Full Stack Developer" },
  { id: "2", title: "Junior Backend Developer" },
  { id: "3", title: "UI/UX Designer" },
];

// This function generates static parameters for dynamic routes
export default function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id,
  }));
}
