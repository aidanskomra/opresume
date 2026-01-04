import type { CategoryFeedback } from "../types/analysis";

type Props = {
  title: string;
  items: CategoryFeedback[];
};

export default function CategorySection({ title, items }: Props) {
  return (
    <section style={{ marginTop: "1.5rem" }}>
      <h2 style={{ marginBottom: 10 }}>{title}</h2>
      {items.map((group) => (
        <div
          key={group.category}
          style={{ border: "1px solid #eee", borderRadius: 10, padding: "0.9rem", marginBottom: 10 }}
        >
          <div style={{ fontWeight: 700, marginBottom: 6 }}>{group.category}</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {group.details.map((d, idx) => (
              <li key={idx} style={{ marginBottom: 6, color: "#333" }}>
                {d}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
