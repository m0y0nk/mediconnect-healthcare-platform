import { Suspense } from "react";
import CategoryFilters from "./CategoryFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// This is the main page component. It is now a Server Component.
// NOTICE: There is NO "use client" here. This is correct.
export default function CategoriesPage() {
  
  // This is the fallback UI (loading skeleton)
  const LoadingFallback = (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- SKELETON FILTERS SIDEBAR --- */}
        <aside className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </CardContent>
          </Card>
        </aside>

        {/* --- SKELETON HOSPITAL LISTINGS --- */}
        <main className="lg:col-span-3">
          <Skeleton className="h-8 w-1/2 mb-6" />
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </main>
      </div>
    </div>
  );

  return (
    // The Suspense boundary wraps your client component
    <Suspense fallback={LoadingFallback}>
      <CategoryFilters />
    </Suspense>
  );
}