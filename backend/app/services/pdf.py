from PyPDF2 import PdfReader
from fastapi import UploadFile, HTTPException
from io import BytesIO
from app.core.config import MAX_PDF_MB

MAX_PAGES = 5
MAX_PDF_BYTES = MAX_PDF_MB * 1024 * 1024

def extract_text_from_pdf(file: UploadFile) -> str:
    try:
        file.file.seek(0)

        # Read only up to the limit
        data = file.file.read(MAX_PDF_BYTES + 1)
        if len(data) > MAX_PDF_BYTES:
            raise HTTPException(status_code=400, detail=f"PDF exceeds {MAX_PDF_MB} MB limit")

        # Parse the PDF from bytes
        reader = PdfReader(BytesIO(data))
        if len(reader.pages) > MAX_PAGES:
            raise HTTPException(status_code=400, detail="PDF exceeds maximum page limit")

        # Etract page by page
        text_chunks: list[str] = []
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text_chunks.append(page_text)

        full_text = "\n".join(text_chunks).strip()
        if not full_text:
            raise HTTPException(status_code=400, detail="No extractable text found in PDF")

        return full_text

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or corrupted PDF file")