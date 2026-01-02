import { useState } from "react";

function App() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobText, setJobText] = useState("");

  const handleSubmit = async () => {
    if (!resume || !jobText) {
      alert("Please upload a PDF and paste a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_text", jobText);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div style={{ maxWidth: 600, margin: "4rem auto", fontFamily: "sans-serif" }}>
      <h1> OPResume AI Resume Analyzer</h1>
      <p>Upload your resume and paste the job posting to get started.</p>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setResume(e.target.files?.[0] || null)}
      />

      <textarea
        placeholder="Paste job description here..."
        rows={8}
        style={{ width: "100%", marginTop: "1rem" }}
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
      />

      <button
        style={{ marginTop: "1rem" }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
