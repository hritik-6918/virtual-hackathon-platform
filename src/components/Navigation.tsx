import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  Upload,
  Award,
  UserCircle,
  Menu,
  X,
} from 'lucide-react';
import { useHackathonStore } from '../store/hackathonStore';

export const Navigation: React.FC = () => {
  const { currentUser } = useHackathonStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/teams', icon: Users, label: 'Teams' },
    { to: '/submissions', icon: Upload, label: 'Submissions' },
    ...(currentUser?.role === 'judge'
      ? [{ to: '/judging', icon: Award, label: 'Judge' }]
      : []),
    { to: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <nav className="border-b border-gray-800 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">
              Virtual Hackathon
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 rounded-lg px-3 py-2 text-base font-medium ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};