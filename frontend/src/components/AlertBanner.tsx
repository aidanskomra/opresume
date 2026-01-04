type Props = {
  message: string;
};

export default function AlertBanner({ message }: Props) {
  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "0.75rem 1rem",
        border: "1px solid #f5c2c7",
        background: "#f8d7da",
        color: "#842029",
        borderRadius: 8,
        whiteSpace: "pre-wrap",
      }}
      role="alert"
    >
      {message}
    </div>
  );
}
