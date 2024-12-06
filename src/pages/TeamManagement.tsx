import React from 'react';
import { CreateTeamForm } from '../components/forms/CreateTeamForm';
import { TeamCard } from '../components/TeamCard';
import { useHackathonStore } from '../store/hackathonStore';

export const TeamManagement: React.FC = () => {
  const { teams, currentUser } = useHackathonStore();
  const userTeam = teams.find((team) =>
    team.members.some((member) => member.id === currentUser?.id)
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Team Management</h1>

      {userTeam ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Your Team</h2>
          <TeamCard team={userTeam} />
        </div>
      ) : (
        <CreateTeamForm />
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Available Teams</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams
            .filter((team) => team.lookingForMembers)
            .map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
        </div>
      </div>
    </div>
  );
};