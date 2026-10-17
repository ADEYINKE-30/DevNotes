interface LoadingSpinnerProps {
  label?: string;
}

const LoadingSpinner = ({ label = "Loading" }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <span
        className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400"
        aria-hidden="true"
      />
      <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
    </div>
  );
};

export default LoadingSpinner;
