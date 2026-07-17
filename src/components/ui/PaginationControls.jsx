import React from "react";

export default function PaginationControls({
  page,
  totalPages,
  totalElements,
  setPage,
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-3 px-1">
      <div className="text-sm text-ink/60 dark:text-muted-dark">
        Page {page + 1} of {totalPages} — {totalElements} items
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1.5 rounded-lg border border-tea-100 dark:border-card-border-dark bg-card dark:bg-card-dark text-ink dark:text-ink-dark hover:bg-tea-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page <= 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          Previous
        </button>
        <button
          className="px-3 py-1.5 rounded-lg border border-tea-100 dark:border-card-border-dark bg-card dark:bg-card-dark text-ink dark:text-ink-dark hover:bg-tea-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
