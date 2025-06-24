
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function BlogCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden bg-card border-border">
        <Skeleton className="relative h-40 w-full overflow-hidden" />
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </CardContent>
    </Card>
  )
}
