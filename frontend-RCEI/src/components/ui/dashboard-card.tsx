
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function DashboardCard({
  title,
  className,
  children,
  icon,
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {title && (
        <CardHeader className="bg-muted/50 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            {icon && <span className="text-rcei-green-500">{icon}</span>}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(!title && "pt-6")}>
        {children}
      </CardContent>
    </Card>
  );
}