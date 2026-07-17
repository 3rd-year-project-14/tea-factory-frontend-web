const VARIANTS = {
  success: "bg-tea-100 text-tea-800 dark:bg-tea-900/40 dark:text-tea-100",
  warning: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200",
  neutral: "bg-earth-100 text-earth-700 dark:bg-white/10 dark:text-muted-dark",
};

export default function Badge({ variant = "neutral", className = "", children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
