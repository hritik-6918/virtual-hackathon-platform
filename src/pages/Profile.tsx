import React from 'react';
import { UserProfile } from '../components/profile/UserProfile';

export const Profile: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Profile</h1>
      <UserProfile />
    </div>
  );
};