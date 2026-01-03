from PyPDF2 import PdfReader
from fastapi import UploadFile, HTTPException

MAX_PAGES = 5

def extract_text_from_pdf(file: UploadFile) -> str:
    try:
        reader = PdfReader(file.file)

        if len(reader.pages) > MAX_PAGES:
            raise HTTPException(
                status_code=400,
                detail="PDF is too long"
            )

        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from PDF"
            )

        return text.strip()

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid PDF file"
        )