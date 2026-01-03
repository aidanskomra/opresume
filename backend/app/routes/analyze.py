from fastapi import APIRouter, UploadFile, File, Form
from app.services.pdf import extract_text_from_pdf
from app.services.gpt import analyze_resume

router = APIRouter()

@router.post("/analyze")
async def analyze_resume_endpoint(
    resume: UploadFile = File(...),
    job_description: str | None = Form(None),
):
    resume_text = extract_text_from_pdf(resume)
    result = analyze_resume(resume_text, job_description)
    return result