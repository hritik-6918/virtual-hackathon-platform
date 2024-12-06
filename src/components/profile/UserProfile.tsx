import React from 'react';
import { Github, Linkedin, Save } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useHackathonStore } from '../../store/hackathonStore';

export const UserProfile: React.FC = () => {
  const { currentUser, updateUserProfile } = useHackathonStore();
  const [formData, setFormData] = React.useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    githubUrl: currentUser?.githubUrl || '',
    linkedinUrl: currentUser?.linkedinUrl || '',
    skills: currentUser?.skills || [],
  });
  const [newSkill, setNewSkill] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-gray-300">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bio: e.target.value }))
            }
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
            rows={4}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            <Github className="mr-2 inline-block h-4 w-4" />
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))
            }
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            <Linkedin className="mr-2 inline-block h-4 w-4" />
            LinkedIn URL
          </label>
          <input
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))
            }
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 rounded-lg bg-gray-700 px-4 py-2 text-white"
              placeholder="Add a skill"
            />
            <Button
              type="button"
              onClick={addSkill}
              variant="secondary"
              size="sm"
            >
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Profile
        </Button>
      </form>
    </Card>
  );
};