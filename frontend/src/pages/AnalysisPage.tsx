import { useLocation, useNavigate } from "react-router-dom";
import type { AnalysisResult } from "../types/analysis";
import ScoreCard from "../components/ScoreCard";
import CategorySection from "../components/CategorySection";

export default function AnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();


  const stateResult = (location.state as { result?: AnalysisResult } | null)?.result;
  const stored = sessionStorage.getItem("analysisResult");
  const storedResult = stored ? (JSON.parse(stored) as AnalysisResult) : null;

  const result = stateResult || storedResult;

  if (!result) {
    return (
      <div style={{ maxWidth: 800, margin: "4rem auto", padding: "0 1rem", fontFamily: "sans-serif" }}>
        <h1>Analysis</h1>
        <p>No analysis data found. Please run a new analysis.</p>
        <button
          onClick={() => navigate("/")}
          style={{ padding: "0.7rem 1.1rem", borderRadius: 10, border: "1px solid #333", background: "#fff" }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
  <div className="op-page">
    <div className="op-shell items-start">
      <div className="op-container">
        <div className="op-topbar">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
                <span className="text-emerald-400">OP</span>Resume Analysis
            </h1>
            <p className="mt-2 text-slate-400">
              Review your score, key findings, and feedback.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sessionStorage.removeItem("analysisResult");
                navigate("/");
              }}
              className="op-primary-btn"
            >
              Start New Analysis
            </button>
          </div>
        </div>

        <div className="op-grid-2">
          <ScoreCard score={result.score} />

          <div className="op-card">
            <h2 className="op-card-title">Summary</h2>

            <div className="mt-4 leading-relaxed text-slate-200 whitespace-pre-wrap">
              {result.summary}
            </div>
          </div>
        </div>

        <div className="op-grid-2">
          <CategorySection title="Strengths" items={result.strengths} />
          <CategorySection title="Improvements" items={result.improvements} />
        </div>

        <div className="op-grid-2">
          <div className="op-card">
            <h2 className="op-card-title">ATS Notes</h2>
            <p className="op-card-help">Parsing and keyword scan.</p>

            <ul className="mt-4 space-y-2 pl-5 text-slate-200">
              {result.ats_notes.map((n, idx) => (
                <li key={idx}>{n}</li>
              ))}
            </ul>
          </div>

          <div className="op-card">
            <h2 className="op-card-title">Next Steps</h2>
            <p className="op-card-help">Recommended improvements to prioritize.</p>

            <ul className="mt-4 space-y-2 pl-5 text-slate-200">
              {result.next_steps.map((n, idx) => (
                <li key={idx}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
      <footer className="pb-2 text-center text-sm text-slate-500">
    © 2026 Aidan Skomra
  </footer>
  </div>
);
}