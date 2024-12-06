import React from 'react';
import { Calendar, Trophy, Users } from 'lucide-react';
import { format } from 'date-fns';
import type { Hackathon } from '../types';

interface HackathonHeaderProps {
  hackathon: Hackathon;
}

export const HackathonHeader: React.FC<HackathonHeaderProps> = ({
  hackathon,
}) => {
  return (
    <div className="space-y-6 rounded-xl bg-gray-800/50 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">{hackathon.title}</h1>
        <p className="text-lg text-gray-400">{hackathon.description}</p>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2 text-gray-300">
          <Calendar className="h-5 w-5 text-purple-500" />
          <span>
            {format(new Date(hackathon.startDate), 'MMM d')} -{' '}
            {format(new Date(hackathon.endDate), 'MMM d, yyyy')}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Users className="h-5 w-5 text-purple-500" />
          <span>Max {hackathon.maxTeamSize} per team</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Trophy className="h-5 w-5 text-purple-500" />
          <span>{hackathon.prizes.length} Prizes</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {hackathon.prizes.map((prize) => (
          <div
            key={prize.position}
            className="rounded-lg bg-gray-800 p-4 ring-1 ring-purple-500/20"
          >
            <div className="text-sm text-purple-400">
              {prize.position === 1
                ? '1st Place'
                : prize.position === 2
                ? '2nd Place'
                : '3rd Place'}
            </div>
            <div className="mt-1 font-semibold text-white">{prize.title}</div>
            <div className="mt-1 text-sm text-gray-400">{prize.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};