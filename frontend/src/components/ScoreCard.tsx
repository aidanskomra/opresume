type Props = {
  score: number;
};

export default function ScoreCard({ score }: Props) {
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div className="op-card">
      <h2 className="op-card-title">Score</h2>

      <div className="mt-4 flex items-end gap-4">
        <div className="text-6xl font-extrabold text-slate-100">{clamped}</div>
        <div className="pb-2 text-sm text-slate-400">out of 100</div>
      </div>

      <div className="op-progress">
        <div className="h-full bg-emerald-500" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
