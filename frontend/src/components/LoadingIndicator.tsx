export default function LoadingIndicator() {
  return (
    <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "2px solid #ccc",
          borderTopColor: "#333",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span>Analyzing your resume…</span>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
