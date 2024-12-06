import React from 'react';
import { Upload, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useHackathonStore } from '../../store/hackathonStore';
import type { ProjectSubmission } from '../../types';

interface ProjectSubmissionFormProps {
  teamId: string;
}

export const ProjectSubmissionForm: React.FC<ProjectSubmissionFormProps> = ({
  teamId,
}) => {
  const { submitProject } = useHackathonStore();
  const [formData, setFormData] = React.useState<Partial<ProjectSubmission>>({
    teamId,
    projectName: '',
    description: '',
    demoUrl: '',
    repoUrl: '',
    screenshots: [],
    techStack: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProject({
      id: crypto.randomUUID(),
      ...formData as ProjectSubmission,
      submittedAt: new Date().toISOString(),
    });
  };

  return (
    <Card className="w-full max-w-2xl p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Submit Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-gray-300">Project Name</label>
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
          <label className="mb-2 block text-sm text-gray-300">Demo URL</label>
          <input
            type="url"
            value={formData.demoUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))
            }
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Repository URL
          </label>
          <input
            type="url"
            value={formData.repoUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, repoUrl: e.target.value }))
            }
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Submit Project
        </Button>
      </form>
    </Card>
  );
};