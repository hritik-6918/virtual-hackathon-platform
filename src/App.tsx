import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { TeamManagement } from './pages/TeamManagement';
import { ProjectSubmissions } from './pages/ProjectSubmissions';
import { JudgingDashboard } from './pages/JudgingDashboard';
import { Profile } from './pages/Profile';
import { useHackathonStore } from './store/hackathonStore';

// Mock data for demonstration
const mockHackathon = {
  id: '1',
  title: 'Innovation Summit 2024',
  description:
    'Join us for a 48-hour virtual hackathon focused on building innovative solutions for sustainable technology.',
  startDate: '2024-04-15',
  endDate: '2024-04-17',
  status: 'upcoming' as const,
  maxTeamSize: 4,
  prizes: [
    {
      position: 1,
      title: 'Grand Prize',
      description: 'Best Overall Project',
      value: '$5,000',
    },
    {
      position: 2,
      title: 'Runner Up',
      description: 'Second Best Project',
      value: '$3,000',
    },
    {
      position: 3,
      title: 'Innovation Award',
      description: 'Most Innovative Solution',
      value: '$2,000',
    },
  ],
  teams: [],
  judgingCriteria: [
    {
      id: '1',
      name: 'Innovation',
      description: 'How innovative and unique is the solution?',
      maxScore: 5,
    },
    {
      id: '2',
      name: 'Technical Complexity',
      description: 'How technically sophisticated is the implementation?',
      maxScore: 5,
    },
    {
      id: '3',
      name: 'Impact',
      description: 'What is the potential impact of this solution?',
      maxScore: 5,
    },
  ],
};

// Mock user for demonstration
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  role: 'participant' as const,
  skills: ['React', 'TypeScript', 'Node.js'],
  bio: 'Full-stack developer passionate about building innovative solutions.',
};

function App() {
  const { setCurrentHackathon, setCurrentUser } = useHackathonStore();

  React.useEffect(() => {
    setCurrentHackathon(mockHackathon);
    setCurrentUser(mockUser);
  }, [setCurrentHackathon, setCurrentUser]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <main className="mx-auto max-w-7xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teams" element={<TeamManagement />} />
            <Route path="/submissions" element={<ProjectSubmissions />} />
            <Route path="/judging" element={<JudgingDashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'bg-gray-800 text-white',
            duration: 3000,
          }}
        />
      </div>
    </Router>
  );
}

export default App;