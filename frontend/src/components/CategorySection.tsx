import type { CategoryFeedback } from "../types/analysis";

type Props = {
  title: string;
  items: CategoryFeedback[];
};

export default function CategorySection({ title, items }: Props) {
  if (!items?.length) return null;

  return (
    <div className="op-card">
      <h2 className="op-card-title">{title}</h2>

      <div className="mt-5 space-y-3">
        {items.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-slate-800 bg-slate-950/40 p-4"
          >
            <div className="font-semibold text-slate-100">{group.category}</div>

            <ul className="mt-3 space-y-2 pl-5 text-slate-300">
              {group.details.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
