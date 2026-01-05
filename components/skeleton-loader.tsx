"use client"

export function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card animate-pulse">
      {/* Poster skeleton */}
      <div className="h-64 bg-muted" />
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
        <div className="h-10 bg-muted rounded w-full" />
      </div>
    </div>
  )
}

export function MovieDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="h-96 bg-muted rounded-lg md:col-span-1" />
        <div className="space-y-4 md:col-span-3">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-12 bg-muted rounded" />
            <div className="h-12 bg-muted rounded" />
            <div className="h-12 bg-muted rounded" />
          </div>
        </div>
      </div>
      {/* Where to watch skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-1/4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
