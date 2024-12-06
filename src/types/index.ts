export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'participant' | 'organizer' | 'judge';
  skills: string[];
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  members: User[];
  projectName: string;
  description: string;
  lookingForMembers: boolean;
  skills: string[];
  submission?: ProjectSubmission;
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  prizes: Prize[];
  teams: Team[];
  maxTeamSize: number;
  judgingCriteria: JudgingCriteria[];
}

export interface Prize {
  position: number;
  title: string;
  description: string;
  value: string;
}

export interface ProjectSubmission {
  id: string;
  teamId: string;
  projectName: string;
  description: string;
  demoUrl: string;
  repoUrl: string;
  screenshots: string[];
  techStack: string[];
  submittedAt: string;
  scores?: JudgingScore[];
}

export interface JudgingCriteria {
  id: string;
  name: string;
  description: string;
  maxScore: number;
}

export interface JudgingScore {
  criteriaId: string;
  score: number;
  comment: string;
  judgeId: string;
}