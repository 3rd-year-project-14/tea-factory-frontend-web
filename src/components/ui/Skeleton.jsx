export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-tea-100 dark:bg-white/10 ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-card dark:bg-card-dark rounded-2xl shadow-soft border border-tea-100 dark:border-card-border-dark p-6">
      <Skeleton className="h-4 w-1/2 mb-3" />
      <Skeleton className="h-7 w-1/3" />
    </div>
  );
}
