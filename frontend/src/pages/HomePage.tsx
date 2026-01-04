import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import AlertBanner from "../components/AlertBanner";
import type { AnalysisResult } from "../types/analysis";

const API_URL = "http://127.0.0.1:8000/analyze";

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

      const raw = await response.text(); // read as text first to handle non-JSON errors safely
      if (!response.ok) {
        setErrorMsg(formatApiError(response.status, raw));
        return;
      }

      const result = JSON.parse(raw) as AnalysisResult;

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
    <div style={{ maxWidth: 800, margin: "4rem auto", padding: "0 1rem", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: 8 }}>OPResume AI Resume Analyzer</h1>
      <p style={{ marginTop: 0, color: "#444" }}>
        Upload your resume and optionally paste a job posting to receive a detailed analysis.
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>Resume (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          disabled={isLoading}
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>
          Job Posting (optional)
        </label>
        <textarea
          placeholder="Paste job description here (optional)…"
          rows={10}
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          disabled={isLoading}
        />
        <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>
          Note: Requests are rate-limited to prevent abuse.
        </div>
      </div>

      <button
        style={{
          marginTop: "1.25rem",
          padding: "0.7rem 1.1rem",
          borderRadius: 10,
          border: "1px solid #333",
          background: isLoading ? "#eee" : "#fff",
          cursor: isLoading ? "not-allowed" : "pointer",
          fontWeight: 600,
        }}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing…" : "Submit"}
      </button>

      {isLoading && <LoadingIndicator />}
      {errorMsg && <AlertBanner message={errorMsg} />}
    </div>
  );
}
