export default function Card({ className = "", children, hoverable = false, ...props }) {
  return (
    <div
      className={`bg-card dark:bg-card-dark rounded-2xl shadow-soft border border-tea-100 dark:border-card-border-dark p-6 transition-shadow duration-200 ${
        hoverable ? "hover:shadow-card" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = "" }) {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`}>
      <div>
        <h3 className="font-heading text-lg font-semibold text-ink dark:text-ink-dark">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-ink/60 dark:text-muted-dark mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
