import { DashboardCard } from "@/components/ui/dashboard-card";
import { BarChart3 } from "lucide-react";
import { BarChart as RBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getWorks, DEFAULT_ORCID } from "@/services/orcid";

export function CitationsChart() {
  const { data } = useQuery({
    queryKey: ["works", DEFAULT_ORCID],
    queryFn: () => getWorks(DEFAULT_ORCID),
  });

  const counts: Record<string, number> = {};
  data?.works?.group?.forEach((g: any) => {
    g["work-summary"].forEach((w: any) => {
      const year = w?.publicationDate?.year?.value;
      if (year) {
        counts[year] = (counts[year] || 0) + 1;
      }
    });
  });

  const chartData = Object.entries(counts)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([year, count]) => ({ year, citations: count }));

  return (
    <DashboardCard title="Publicações por Ano" icon={<BarChart3 size={18} />}>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} publicações`, "Quantidade"]} labelFormatter={(value) => `Ano: ${value}`}/>
            <Bar dataKey="citations" fill="#39934c" radius={[4, 4, 0, 0]} />
          </RBarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
