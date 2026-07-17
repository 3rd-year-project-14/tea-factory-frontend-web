const VARIANTS = {
  primary:
    "bg-tea-700 text-white hover:bg-tea-800 focus-visible:ring-tea-500 shadow-soft",
  secondary:
    "bg-earth-600 text-white hover:bg-earth-700 focus-visible:ring-earth-400 shadow-soft",
  outline:
    "border border-tea-700 text-tea-700 hover:bg-tea-50 dark:text-tea-100 dark:border-tea-500 dark:hover:bg-tea-900/40",
  ghost:
    "text-ink hover:bg-tea-50 dark:text-ink-dark dark:hover:bg-white/5",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </Component>
  );
}
