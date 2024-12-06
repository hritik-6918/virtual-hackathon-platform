import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useHackathonStore } from '../../store/hackathonStore';

export const CreateTeamForm: React.FC = () => {
  const { currentUser, addTeam } = useHackathonStore();
  const [formData, setFormData] = React.useState({
    name: '',
    projectName: '',
    description: '',
    skills: [] as string[],
  });
  const [skill, setSkill] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    addTeam({
      id: crypto.randomUUID(),
      ...formData,
      members: [currentUser],
      lookingForMembers: true,
    });
  };

  const addSkill = () => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setSkill('');
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Create New Team</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-gray-300">Team Name</label>
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
          <label className="mb-2 block text-sm text-gray-300">
            Project Name
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, projectName: e.target.value }))
            }
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Skills Needed</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="flex-1 rounded-lg bg-gray-700 px-4 py-2 text-white"
              placeholder="Add a skill"
            />
            <Button
              type="button"
              onClick={addSkill}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-400"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Create Team
        </Button>
      </form>
    </Card>
  );
};