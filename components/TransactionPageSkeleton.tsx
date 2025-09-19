import { Skeleton } from "@/components/ui/skeleton";

const TransactionPageSkeleton = () => {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Back button skeleton */}
      <Skeleton className="h-9 w-32" />

      {/* Header section with timeframe and export button */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Transaction cards skeleton (3 cards in responsive grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-36 w-full rounded-md" />
        <Skeleton className="h-36 w-full rounded-md" />
        <Skeleton className="h-36 w-full rounded-md" />
      </div>

      {/* Individual transaction items skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="w-24 h-4 rounded" />
                <div className="flex gap-2">
                  <Skeleton className="w-16 h-3 rounded" />
                  <Skeleton className="w-20 h-3 rounded" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-20 h-4 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TransactionPageSkeleton;
