from pydantic import BaseModel

class CategoryFeedback(BaseModel):
    category: str
    details: list[str]

class AnalysisResult(BaseModel):
    score: int
    summary: str
    strengths: list[CategoryFeedback]
    improvements: list[CategoryFeedback]
    ats_notes: list[str]
    next_steps: list[str]
