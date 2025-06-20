import { Award, BookMarked, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getActivities, DEFAULT_ORCID } from "@/services/orcid";

export function StatsSummary() {
  const { data } = useQuery({
    queryKey: ["activities", DEFAULT_ORCID],
    queryFn: () => getActivities(DEFAULT_ORCID),
  });

  const works = data?.['activities-summary']?.works?.group?.length ?? 0;
  const funding = data?.['activities-summary']?.funding?.group?.length ?? 0;
  const reviews = data?.['activities-summary']?.['peer-reviews']?.group?.length ?? 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="bg-white rounded-lg p-6 shadow-sm border flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-rcei-green-100 flex items-center justify-center text-rcei-green-600">
          <BookMarked size={24} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total de Publicações</p>
          <p className="text-2xl font-bold">{works}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-rcei-blue-100 flex items-center justify-center text-rcei-blue-600">
          <MessageSquare size={24} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Financiamentos</p>
          <p className="text-2xl font-bold">{funding}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-rcei-green-100 flex items-center justify-center text-rcei-green-600">
          <Award size={24} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Revisões</p>
          <p className="text-2xl font-bold">{reviews}</p>
        </div>
      </div>
    </div>
  );
}
