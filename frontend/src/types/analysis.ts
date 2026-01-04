export type CategoryFeedback = {
  category: string;
  details: string[];
};

export type AnalysisResult = {
  score: number;
  summary: string;
  strengths: CategoryFeedback[];
  improvements: CategoryFeedback[];
  ats_notes: string[];
  next_steps: string[];
};
