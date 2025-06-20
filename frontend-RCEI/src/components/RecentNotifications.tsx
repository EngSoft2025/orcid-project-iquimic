import { DashboardCard } from "@/components/ui/dashboard-card";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getActivities, DEFAULT_ORCID } from "@/services/orcid";

interface Notification {
  id: string;
  title: string;
  time?: string;
  type: string;
}

export function RecentNotifications() {
  const { data } = useQuery({
    queryKey: ["activities", DEFAULT_ORCID],
    queryFn: () => getActivities(DEFAULT_ORCID),
  });

  const works = data?.['activities-summary']?.works?.group ?? [];
  const notifications: Notification[] = works.slice(0, 4).map((g: any) => {
    const w = g['work-summary'][0];
    return {
      id: String(w['put-code']),
      title: w?.title?.title?.value ?? '',
      type: 'publication',
      time: w?.publicationDate?.year?.value,
    };
  });

  const getIconForType = (type: string) => {
    const iconClasses = 'h-8 w-8 p-1.5 rounded-full';
    switch (type) {
      case 'publication':
        return <div className={cn(iconClasses, 'bg-green-100 text-green-600')}>📝</div>;
      default:
        return <div className={cn(iconClasses, 'bg-gray-100 text-gray-600')}>📄</div>;
    }
  };

  return (
    <DashboardCard title="Notificações Recentes" icon={<Bell size={18} />}>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            {getIconForType(notification.type)}
            <div className="space-y-1">
              <h4 className="text-sm font-medium">{notification.title}</h4>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
