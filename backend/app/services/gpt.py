from __future__ import annotations

from fastapi import HTTPException
from openai import OpenAI

from app.core.config import OPENAI_API_KEY, OPENAI_MODEL
from app.schemas.analysis import AnalysisResult

client = OpenAI(api_key=OPENAI_API_KEY)

# system prompt defines the strict output requirements following the analysis schema
SYSTEM_PROMPT = """
You are a professional ATS and recruiter resume evaluator.

Return ONLY valid JSON that exactly matches the provided schema.
Be detailed, specific, and actionable.
Do NOT include markdown.
Do NOT include explanations outside JSON.
Score must be an integer from 0 to 100.

Scoring weights:
- 60% job alignment
- 25% experience & skills
- 15% formatting & clarity
""".strip()


def analyze_resume(resume_text: str, job_text: str | None) -> AnalysisResult:
    user_prompt = f"""
Analyze the resume below and return a detailed evaluation.

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_text or "Not provided"}
""".strip()

    try:
        response = client.responses.parse(
            model=OPENAI_MODEL,
            input=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            text_format=AnalysisResult,
        )
        return response.output_parsed

    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI analysis failed: {type(e).__name__}")
