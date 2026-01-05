import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import AlertBanner from "../components/AlertBanner";
import ResumeDropzone from "../components/ResumeDropzone";
import type { AnalysisResult } from "../types/analysis";

//Base API URL injected at build time
//points to render backend
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const API_URL = `${API_BASE}/analyze`

// Maps HTTP error codes to user friendly error messages
function formatApiError(status: number, bodyText: string) {
  if (status === 429) return "Too many requests. Please wait a moment and try again.";
  if (status === 400) return bodyText || "Invalid input. Please check your PDF and job posting.";
  return bodyText || `Request failed with status ${status}.`;
}

export default function HomePage() {
  const navigate = useNavigate();

  const [resume, setResume] = useState<File | null>(null);
  const [jobText, setJobText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Submits the resume and job posting to the backend for analysis
  const handleSubmit = async () => {
    setErrorMsg(null);

    if (!resume) {
      setErrorMsg("Please upload a PDF resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    const trimmed = jobText.trim();
    if (trimmed.length > 0) {
      formData.append("job_description", trimmed);
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, { method: "POST", body: formData });

      // read raw first
      const raw = await response.text();
      if (!response.ok) {
        setErrorMsg(formatApiError(response.status, raw));
        return;
      }

      // successful analysis result
      const result = JSON.parse(raw) as AnalysisResult;

      // persist so the analysis page survives reloads
      sessionStorage.setItem("analysisResult", JSON.stringify(result));

      navigate("/analysis", { state: { result } });
    } catch {
      setErrorMsg(
        "Failed to reach the backend. Confirm the backend is running on http://127.0.0.1:8000 and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="op-page">
  <div className="op-shell">
    <div className="op-container">
      <div className="op-title">
        <h1 className="op-h1">
          <span className="text-emerald-400">OP</span>Resume
        </h1>
        <p className="op-subtitle">Optimize your resume with AI analysis!</p>
      </div>

      <div className="op-grid-2">
        <div className="op-card">
          <h2 className="op-card-title">Job Posting (optional)</h2>
          <p className="op-card-help">Paste the job description to improve scoring accuracy.</p>
          <textarea
                className="op-textarea"
                placeholder="Paste job description here..."
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                disabled={isLoading}
              />
        </div>

        <div className="op-card">
          <h2 className="op-card-title">Resume (PDF)</h2>
          <p className="op-card-help">Drag and drop or click to upload a PDF resume.</p>
          <ResumeDropzone
                selectedFile={resume}
                onFileSelected={setResume}
                disabled={isLoading}
                iconSrc="/upload.png"
           />
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="op-primary-btn">{isLoading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
        <div className="mt-4 flex justify-center">
            {isLoading && <LoadingIndicator />}
          </div>
          {errorMsg && <AlertBanner message={errorMsg} />}
            <footer className="mt-5 pb-2 text-center text-sm text-slate-500">
                © 2026 Aidan Skomra
            </footer>
    </div>
  </div>
</div>

);

}
