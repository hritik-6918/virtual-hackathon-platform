import React from 'react';
import { Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useHackathonStore } from '../../store/hackathonStore';
import type { ProjectSubmission, JudgingCriteria } from '../../types';

interface JudgingInterfaceProps {
  submission: ProjectSubmission;
  criteria: JudgingCriteria[];
}

export const JudgingInterface: React.FC<JudgingInterfaceProps> = ({
  submission,
  criteria,
}) => {
  const { currentUser, addJudgingScore } = useHackathonStore();
  const [scores, setScores] = React.useState<Record<string, number>>({});
  const [comments, setComments] = React.useState<Record<string, string>>({});

  const handleSubmitScores = () => {
    if (!currentUser) return;

    criteria.forEach((criterion) => {
      if (scores[criterion.id] !== undefined) {
        addJudgingScore(submission.id, {
          criteriaId: criterion.id,
          score: scores[criterion.id],
          comment: comments[criterion.id] || '',
          judgeId: currentUser.id,
        });
      }
    });
  };

  return (
    <Card className="w-full max-w-3xl p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Judge Submission</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">
          {submission.projectName}
        </h3>
        <p className="mt-2 text-gray-400">{submission.description}</p>
      </div>

      <div className="space-y-6">
        {criteria.map((criterion) => (
          <div key={criterion.id} className="space-y-2">
            <h4 className="text-lg font-medium text-white">
              {criterion.name}
              <span className="ml-2 text-sm text-gray-400">
                (Max: {criterion.maxScore})
              </span>
            </h4>
            <p className="text-sm text-gray-400">{criterion.description}</p>
            <div className="flex items-center gap-2">
              {[...Array(criterion.maxScore)].map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setScores((prev) => ({
                      ...prev,
                      [criterion.id]: i + 1,
                    }))
                  }
                  className={`rounded-full p-1 transition-colors ${
                    (scores[criterion.id] || 0) > i
                      ? 'text-purple-400'
                      : 'text-gray-600'
                  }`}
                >
                  <Star className="h-6 w-6" />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Add comments..."
              value={comments[criterion.id] || ''}
              onChange={(e) =>
                setComments((prev) => ({
                  ...prev,
                  [criterion.id]: e.target.value,
                }))
              }
              className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white"
              rows={2}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleSubmitScores} className="mt-6 w-full">
        Submit Evaluation
      </Button>
    </Card>
  );
};