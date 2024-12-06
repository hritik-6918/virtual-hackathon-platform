import React from 'react';
import { JudgingInterface } from '../components/judging/JudgingInterface';
import { useHackathonStore } from '../store/hackathonStore';

export const JudgingDashboard: React.FC = () => {
  const { currentHackathon, submissions, currentUser } = useHackathonStore();

  if (currentUser?.role !== 'judge' || !currentHackathon) {
    return (
      <div className="text-center text-gray-400">
        You don't have access to this page.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Judging Dashboard</h1>

      <div className="space-y-8">
        {submissions.map((submission) => (
          <JudgingInterface
            key={submission.id}
            submission={submission}
            criteria={currentHackathon.judgingCriteria}
          />
        ))}
      </div>
    </div>
  );
};