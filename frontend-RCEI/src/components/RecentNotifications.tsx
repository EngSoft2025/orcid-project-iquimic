
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "citation" | "publication" | "collaboration" | "system";
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Nova citação recebida",
    description: "Seu artigo 'A Systematic Review of Educational Data Mining' recebeu 3 novas citações",
    time: "2 horas atrás",
    type: "citation",
  },
  {
    id: "2",
    title: "Nova publicação de colaborador",
    description: "Maria Silva publicou um novo artigo: 'Analysis of Learning Patterns in Online Education'",
    time: "6 horas atrás",
    type: "publication",
  },
  {
    id: "3",
    title: "Convite para colaboração",
    description: "João Santos convidou você para colaborar no projeto 'Machine Learning for Educational Assessment'",
    time: "1 dia atrás",
    type: "collaboration",
  },
  {
    id: "4",
    title: "Atualização do sistema",
    description: "Novas funcionalidades disponíveis para visualização de métricas",
    time: "2 dias atrás",
    type: "system",
  },
];

export function RecentNotifications() {
  const getIconForType = (type: Notification["type"]) => {
    const iconClasses = "h-8 w-8 p-1.5 rounded-full";
    
    switch (type) {
      case "citation":
        return <div className={cn(iconClasses, "bg-blue-100 text-blue-600")}>📊</div>;
      case "publication":
        return <div className={cn(iconClasses, "bg-green-100 text-green-600")}>📝</div>;
      case "collaboration":
        return <div className={cn(iconClasses, "bg-purple-100 text-purple-600")}>👥</div>;
      case "system":
        return <div className={cn(iconClasses, "bg-gray-100 text-gray-600")}>⚙️</div>;
      default:
        return null;
    }
  };

  return (
    <DashboardCard title="Notificações Recentes" icon={<Bell size={18} />}>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            {getIconForType(notification.type)}
            <div className="space-y-1">
              <h4 className="text-sm font-medium">{notification.title}</h4>
              <p className="text-sm text-muted-foreground">{notification.description}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}