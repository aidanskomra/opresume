import { useLocation, useNavigate } from "react-router-dom";
import type { AnalysisResult } from "../types/analysis";
import ScoreCard from "../components/ScoreCard";
import CategorySection from "../components/CategorySection";

export default function AnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Prefer router state; fall back to sessionStorage for refresh safety
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
    <div style={{ maxWidth: 900, margin: "3rem auto", padding: "0 1rem", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ margin: 0 }}>Your Analysis</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("analysisResult");
            navigate("/");
          }}
          style={{ padding: "0.7rem 1.1rem", borderRadius: 10, border: "1px solid #333", background: "#fff" }}
        >
          Start New Analysis
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <ScoreCard score={result.score} />
      </div>

      <section style={{ marginTop: "1.25rem" }}>
        <h2>Summary</h2>
        <p style={{ color: "#333", lineHeight: 1.5 }}>{result.summary}</p>
      </section>

      <CategorySection title="Strengths" items={result.strengths} />
      <CategorySection title="Improvements" items={result.improvements} />

      <section style={{ marginTop: "1.5rem" }}>
        <h2>ATS Notes</h2>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {result.ats_notes.map((n, idx) => (
            <li key={idx} style={{ marginBottom: 6 }}>{n}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Next Steps</h2>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {result.next_steps.map((n, idx) => (
            <li key={idx} style={{ marginBottom: 6 }}>{n}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
