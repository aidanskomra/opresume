from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request
from app.services.pdf import extract_text_from_pdf
from app.services.gpt import analyze_resume
from app.core.config import MAX_JOB_CHARS, MAX_RESUME_CHARS, RATE_LIMIT_ANALYZE
from app.core.ratelimit import limiter

router = APIRouter()

@router.post("/analyze")
@limiter.limit(RATE_LIMIT_ANALYZE)
async def analyze_resume_endpoint(
    request: Request,
    resume: UploadFile = File(...),
    job_description: str | None = Form(None),
):
    resume_text = extract_text_from_pdf(resume)

    resume_text = resume_text[:MAX_RESUME_CHARS]

    if job_description is not None:
        job_description = job_description.strip()
        if len(job_description) == 0:
            job_description = None
        else:
            if len(job_description) > MAX_JOB_CHARS:
                raise HTTPException(status_code=400, detail="Job description too long")

    return analyze_resume(resume_text, job_description)
