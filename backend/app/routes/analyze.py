from fastapi import APIRouter, UploadFile, File, Form
from app.services.pdf import extract_text_from_pdf

router = APIRouter()

@router.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str | None = Form(None),
):
    resume_text = extract_text_from_pdf(resume)

    return {
        "resume_length": len(resume_text),
        "job_description_length": len(job_description) if job_description else 0
    }
