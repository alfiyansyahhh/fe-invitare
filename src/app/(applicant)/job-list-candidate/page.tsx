import JobListApplicantSection from '@/components/sections/joblistApplicantSection';
import { Job } from '@/zustand/store/useJobs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JobList - resume ',
};

const JobListCandidate = async () => {
  const url = new URL('/api/jobs', process.env.NEXT_PUBLIC_BASE_URL);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  const data = await res.json();
  const jobs: Job[] = data.data;

  return (
    <div>
      <JobListApplicantSection list={jobs} />
    </div>
  );
};

export default JobListCandidate;
