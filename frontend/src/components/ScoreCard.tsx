type Props = {
  score: number;
};

export default function ScoreCard({ score }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: "1rem",
        display: "flex",
        alignItems: "baseline",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 800 }}>{score}</div>
      <div style={{ fontSize: 16, color: "#555" }}>Score out of 100</div>
    </div>
  );
}
