import { useId, useState } from "react";

type Props = {
  selectedFile: File | null;
  onFileSelected: (file: File | null) => void;
  disabled?: boolean;
  iconSrc?: string;
};

export default function ResumeDropzone({
  selectedFile,
  onFileSelected,
  disabled = false,
  iconSrc = "/upload.png",
}: Props) {
  const fileInputId = useId();
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);

  const acceptFile = (file: File | null) => {
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return;
    }

    onFileSelected(file);
  };

  return (
    <div className="mt-4">
      <input
        id={fileInputId}
        type="file"
        accept="application/pdf"
        className="sr-only"
        disabled={disabled}
        onChange={(e) => acceptFile(e.target.files?.[0] || null)}
      />

      <label
        htmlFor={fileInputId}
        className={[
          "h-88 w-full rounded-xl border border-dashed p-6",
          "flex flex-col items-center justify-center gap-3 text-center",
          "bg-slate-950/40 text-slate-300 transition",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-emerald-500/60",
          isDropzoneActive ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700",
        ].join(" ")}
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) setIsDropzoneActive(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDropzoneActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDropzoneActive(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDropzoneActive(false);

          if (disabled) return;

          const droppedFile = e.dataTransfer.files?.[0] || null;
          acceptFile(droppedFile);
        }}
      >
        <img src={iconSrc} alt="Upload resume" className="h-20 w-20" />


        {selectedFile && (
          <div className="mt-2 text-xs text-slate-400">
            Selected: <span className="text-slate-200">{selectedFile.name}</span>
          </div>
        )}
      </label>
    </div>
  );
}
