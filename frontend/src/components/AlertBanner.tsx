type Props = {
  message: string;
};

export default function AlertBanner({ message }: Props) {
  if (!message) return null;

  return (
    <div
      className="mt-4 rounded-xl border border-red-900/40 bg-red-950/40 p-4 text-red-200 whitespace-pre-wrap"
      role="alert"
    >
      {message}
    </div>
  );
}
