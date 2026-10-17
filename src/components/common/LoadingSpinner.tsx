interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md";
}

const LoadingSpinner = ({ label, size = "md" }: LoadingSpinnerProps) => {
  const spinnerSize = size === "sm" ? "h-4 w-4 border-2" : "h-9 w-9 border-4";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${size === "sm" ? "gap-0" : ""}`}
      role="status"
      aria-label={label || "Loading"}
      aria-live="polite"
    >
      <span
        className={`${spinnerSize} animate-spin rounded-full border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400`}
        aria-hidden="true"
      />
    </div>
  );
};

export default LoadingSpinner;
