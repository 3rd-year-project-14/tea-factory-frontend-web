import { Leaf } from "lucide-react";

export default function EmptyState({
  icon: Icon = Leaf,
  title = "Nothing here yet",
  description = "There's no data to show right now.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="h-14 w-14 rounded-full bg-tea-50 dark:bg-tea-900/30 flex items-center justify-center mb-4">
        <Icon size={26} className="text-tea-600 dark:text-tea-300" />
      </div>
      <h4 className="font-heading font-semibold text-ink dark:text-ink-dark mb-1">
        {title}
      </h4>
      <p className="text-sm text-ink/60 dark:text-muted-dark max-w-sm mb-4">
        {description}
      </p>
      {action}
    </div>
  );
}
