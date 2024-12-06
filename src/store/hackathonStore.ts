import { create } from 'zustand';
import toast from 'react-hot-toast';
import type { Hackathon, Team, User, ProjectSubmission, JudgingScore } from '../types';

interface HackathonStore {
  currentHackathon: Hackathon | null;
  currentUser: User | null;
  teams: Team[];
  submissions: ProjectSubmission[];
  setCurrentHackathon: (hackathon: Hackathon) => void;
  setCurrentUser: (user: User) => void;
  updateUserProfile: (user: Partial<User>) => void;
  addTeam: (team: Team) => void;
  joinTeam: (teamId: string, user: User) => void;
  submitProject: (submission: ProjectSubmission) => void;
  addJudgingScore: (submissionId: string, score: JudgingScore) => void;
}

export const useHackathonStore = create<HackathonStore>((set) => ({
  currentHackathon: null,
  currentUser: null,
  teams: [],
  submissions: [],
  setCurrentHackathon: (hackathon) => set({ currentHackathon: hackathon }),
  setCurrentUser: (user) => set({ currentUser: user }),
  updateUserProfile: (userData) =>
    set((state) => {
      if (!state.currentUser) return state;
      toast.success('Profile updated successfully!');
      return {
        currentUser: { ...state.currentUser, ...userData },
      };
    }),
  addTeam: (team) =>
    set((state) => {
      const userInTeam = state.teams.some((t) =>
        t.members.some((m) => m.id === state.currentUser?.id)
      );
      if (userInTeam) {
        toast.error('You are already in a team!');
        return state;
      }
      toast.success('Team created successfully!');
      return { teams: [...state.teams, team] };
    }),
  joinTeam: (teamId, user) =>
    set((state) => {
      const userInTeam = state.teams.some((t) =>
        t.members.some((m) => m.id === user.id)
      );
      if (userInTeam) {
        toast.error('You are already in a team!');
        return state;
      }

      const team = state.teams.find((t) => t.id === teamId);
      if (!team) {
        toast.error('Team not found!');
        return state;
      }

      if (team.members.length >= (state.currentHackathon?.maxTeamSize || 4)) {
        toast.error('Team is full!');
        return state;
      }

      toast.success('Joined team successfully!');
      return {
        teams: state.teams.map((t) =>
          t.id === teamId
            ? {
                ...t,
                members: [...t.members, user],
                lookingForMembers:
                  t.members.length + 1 >= (state.currentHackathon?.maxTeamSize || 4)
                    ? false
                    : t.lookingForMembers,
              }
            : t
        ),
      };
    }),
  submitProject: (submission) =>
    set((state) => {
      const team = state.teams.find((t) => t.id === submission.teamId);
      if (!team) {
        toast.error('Team not found!');
        return state;
      }

      if (team.submission) {
        toast.error('Your team has already submitted a project!');
        return state;
      }

      toast.success('Project submitted successfully!');
      return {
        submissions: [...state.submissions, submission],
        teams: state.teams.map((t) =>
          t.id === submission.teamId ? { ...t, submission } : t
        ),
      };
    }),
  addJudgingScore: (submissionId, score) =>
    set((state) => {
      const submission = state.submissions.find((s) => s.id === submissionId);
      if (!submission) {
        toast.error('Submission not found!');
        return state;
      }

      const existingScore = submission.scores?.find(
        (s) => s.criteriaId === score.criteriaId && s.judgeId === score.judgeId
      );
      if (existingScore) {
        toast.error('You have already scored this criterion!');
        return state;
      }

      toast.success('Score submitted successfully!');
      return {
        submissions: state.submissions.map((sub) =>
          sub.id === submissionId
            ? {
                ...sub,
                scores: [...(sub.scores || []), score],
              }
            : sub
        ),
      };
    }),
}));