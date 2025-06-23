import { useEffect, useState } from "react";
import { RceiLayout } from "@/components/RceiLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllInfo } from "@/services/orcid";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Helmet } from "react-helmet";

const COLORS = ["#39934c", "#3a78b9", "#8e9196", "#ef7e32"];

export default function Statistics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [publicationsByType, setPublicationsByType] = useState<
    { name: string; value: number }[]
  >([]);
  const [publicationsByYear, setPublicationsByYear] = useState<
    { year: string; count: number }[]
  >([]);
  const [totalPublications, setTotalPublications] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const resp = await getAllInfo();
        setData(resp);

        const worksGroups = resp["activities-summary"]?.works?.group || [];

        // Contar total de publicações
        setTotalPublications(worksGroups.length);

        const pubsByTypeCount: Record<string, number> = {};
        const pubsByYearCount: Record<string, number> = {};

        worksGroups.forEach((group: any) => {
          const summary = group["work-summary"]?.[0];
          if (!summary) return;

          const typeRaw = summary["type"] || "unknown";
          let typeLabel = "Outros";
          switch (typeRaw) {
            case "journal-article":
              typeLabel = "Artigos";
              break;
            case "conference-paper":
              typeLabel = "Conferências";
              break;
            case "book-chapter":
              typeLabel = "Capítulos";
              break;
            case "book":
              typeLabel = "Livros";
              break;
          }

          pubsByTypeCount[typeLabel] = (pubsByTypeCount[typeLabel] || 0) + 1;

          const pubDate = summary["publication-date"];
          const year = pubDate?.year?.value || "Sem Ano";
          pubsByYearCount[year] = (pubsByYearCount[year] || 0) + 1;
        });

        setPublicationsByType(
          Object.entries(pubsByTypeCount).map(([name, value]) => ({ name, value }))
        );

        const orderedYears = Object.entries(pubsByYearCount)
          .filter(([year]) => year !== "Sem Ano")
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(([year, count]) => ({ year, count }));

        setPublicationsByYear(orderedYears);
      } catch (err: any) {
        console.error(err);
        setError("Erro ao carregar dados do ORCID");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <div>Carregando dados...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <Helmet>
        <title>Estatísticas | RCEI</title>
      </Helmet>
      <RceiLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Estatísticas</h1>
            <p className="text-muted-foreground">
              Visualize métricas e análises detalhadas de sua produção acadêmica
            </p>
          </div>

          {/* Total publicações e citações */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DashboardCard>
              <p className="text-sm text-muted-foreground">Total de Publicações</p>
              <p className="text-3xl font-bold">{totalPublications}</p>
            </DashboardCard>
          </div>

          <Tabs defaultValue="publications" className="w-full">
            <TabsList>
              <TabsTrigger value="publications">Publicações</TabsTrigger>
            </TabsList>

            <TabsContent value="publications" className="space-y-6 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <DashboardCard title="Publicações por Tipo">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={publicationsByType}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {publicationsByType.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} publicações`, "Quantidade"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </DashboardCard>

                <DashboardCard title="Publicações por Ano">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={publicationsByYear}
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
                        <Tooltip formatter={(value) => [`${value} publicações`, "Quantidade"]} />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#39934c"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </DashboardCard>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </RceiLayout>
    </>
  );
}
