import React from 'react';
import { ProjectSubmissionForm } from '../components/forms/ProjectSubmissionForm';
import { Card } from '../components/ui/Card';
import { useHackathonStore } from '../store/hackathonStore';

export const ProjectSubmissions: React.FC = () => {
  const { teams, currentUser, submissions } = useHackathonStore();
  const userTeam = teams.find((team) =>
    team.members.some((member) => member.id === currentUser?.id)
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Project Submissions</h1>

      {userTeam && !userTeam.submission && (
        <ProjectSubmissionForm teamId={userTeam.id} />
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">All Submissions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {submissions.map((submission) => (
            <Card key={submission.id} className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                {submission.projectName}
              </h3>
              <p className="text-gray-400">{submission.description}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={submission.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  View Demo
                </a>
                <a
                  href={submission.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  View Code
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};