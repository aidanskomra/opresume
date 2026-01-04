from dotenv import load_dotenv
import os

load_dotenv()

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL")

MAX_PDF_MB = int(os.getenv("MAX_PDF_MB", "3"))
MAX_JOB_CHARS = int(os.getenv("MAX_JOB_CHARS", "4000"))
MAX_RESUME_CHARS = int(os.getenv("MAX_RESUME_CHARS", "8000"))

RATE_LIMIT_DEFAULT = os.getenv("RATE_LIMIT_DEFAULT", "10/minute")
RATE_LIMIT_ANALYZE = os.getenv("RATE_LIMIT_ANALYZE", "5/minute")

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY not set")
