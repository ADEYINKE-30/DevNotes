interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md";
}

const LoadingSpinner = ({ label, size = "md" }: LoadingSpinnerProps) => {
  const spinnerSize = size === "sm" ? "h-4 w-4 border-[3px]" : "h-9 w-9 border-[5px]";

  return (
    <div
      className="flex items-center justify-center"
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
