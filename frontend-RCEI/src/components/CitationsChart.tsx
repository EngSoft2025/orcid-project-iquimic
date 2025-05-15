
import { useEffect, useRef } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: "2018", citations: 45 },
  { year: "2019", citations: 78 },
  { year: "2020", citations: 156 },
  { year: "2021", citations: 230 },
  { year: "2022", citations: 310 },
  { year: "2023", citations: 422 },
  { year: "2024", citations: 178 },
];

export function CitationsChart() {
  return (
    <DashboardCard title="Citações por Ano" icon={<BarChart3 size={18} />}>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} citações`, "Citações"]}
              labelFormatter={(value) => `Ano: ${value}`}
            />
            <Bar dataKey="citations" fill="#39934c" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}