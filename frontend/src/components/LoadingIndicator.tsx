export default function LoadingIndicator() {
  return (
    <div className="mt-4 flex items-center gap-3 text-slate-200">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-emerald-400" />
      <span>Analyzing your resume…</span>
    </div>
  );
}
