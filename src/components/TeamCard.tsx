import React from 'react';
import { Users, Rocket, UserPlus } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import type { Team } from '../types';
import { useHackathonStore } from '../store/hackathonStore';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const { currentUser, joinTeam } = useHackathonStore();

  const handleJoinTeam = () => {
    if (currentUser) {
      joinTeam(team.id, currentUser);
    }
  };

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{team.name}</h3>
        {team.lookingForMembers && (
          <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-400">
            Recruiting
          </span>
        )}
      </div>

      <p className="text-gray-400">{team.description}</p>

      <div className="flex items-center gap-2 text-gray-400">
        <Rocket className="h-5 w-5" />
        <span>{team.projectName}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {team.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="h-5 w-5" />
          <span>{team.members.length} members</span>
        </div>
        {team.lookingForMembers && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleJoinTeam}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Join Team
          </Button>
        )}
      </div>
    </Card>
  );
};