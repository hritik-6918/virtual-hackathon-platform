import React from 'react';
import { HackathonHeader } from '../components/HackathonHeader';
import { TeamCard } from '../components/TeamCard';
import { useHackathonStore } from '../store/hackathonStore';

export const Dashboard: React.FC = () => {
  const { currentHackathon, teams } = useHackathonStore();

  if (!currentHackathon) return null;

  return (
    <div className="space-y-8">
      <HackathonHeader hackathon={currentHackathon} />

      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Active Teams</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
};