
import { RceiLayout } from "@/components/RceiLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatsSummary } from "@/components/StatsSummary";
import { CitationsChart } from "@/components/CitationsChart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";

const publicationsByType = [
  { name: "Artigos", value: 78 },
  { name: "Conferências", value: 45 },
  { name: "Livros", value: 8 },
  { name: "Capítulos", value: 11 },
];

const publicationsByYear = [
  { year: "2018", count: 9 },
  { year: "2019", count: 12 },
  { year: "2020", count: 16 },
  { year: "2021", count: 23 },
  { year: "2022", count: 29 },
  { year: "2023", count: 34 },
  { year: "2024", count: 19 },
];

const indexOverTime = [
  { year: "2018", h: 10, i10: 12 },
  { year: "2019", h: 12, i10: 15 },
  { year: "2020", h: 15, i10: 18 },
  { year: "2021", h: 18, i10: 25 },
  { year: "2022", h: 20, i10: 32 },
  { year: "2023", h: 22, i10: 38 },
  { year: "2024", h: 24, i10: 42 },
];

const COLORS = ["#39934c", "#3a78b9", "#8e9196", "#ef7e32"];

const Statistics = () => {
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

        <StatsSummary />

        <Tabs defaultValue="publications" className="w-full">
          <TabsList>
            <TabsTrigger value="publications">Publicações</TabsTrigger>
            <TabsTrigger value="citations">Citações</TabsTrigger>
            <TabsTrigger value="indices">Índices</TabsTrigger>
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
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {publicationsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} publicações`, "Quantidade"]} />
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
                      <Line type="monotone" dataKey="count" stroke="#39934c" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardCard>
            </div>

            <DashboardCard title="Detalhamento de Publicações">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Artigos em Periódicos</p>
                    <p className="text-2xl font-semibold">78</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Artigos em Conferências</p>
                    <p className="text-2xl font-semibold">45</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Livros</p>
                    <p className="text-2xl font-semibold">8</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Capítulos de Livro</p>
                    <p className="text-2xl font-semibold">11</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Publicações em Inglês</p>
                    <p className="text-2xl font-semibold">112</p>
                    <p className="text-xs text-muted-foreground">78.9% do total</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Publicações em Português</p>
                    <p className="text-2xl font-semibold">26</p>
                    <p className="text-xs text-muted-foreground">18.3% do total</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Outros Idiomas</p>
                    <p className="text-2xl font-semibold">4</p>
                    <p className="text-xs text-muted-foreground">2.8% do total</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="citations" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <DashboardCard title="Evolução das Citações">
                <div className="h-[300px]">
                  <CitationsChart />
                </div>
              </DashboardCard>

              <DashboardCard title="Top 5 Publicações mais Citadas">
                <div className="space-y-4">
                  <div className="flex justify-between p-2 border-b">
                    <div className="font-medium">Publicação</div>
                    <div className="font-medium">Citações</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">A Systematic Review of Educational Data Mining</div>
                      <div className="text-sm font-semibold">186</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Intelligent Tutoring Systems: Design Principles and Applications</div>
                      <div className="text-sm font-semibold">142</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Machine Learning for Educational Assessment</div>
                      <div className="text-sm font-semibold">98</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Collaborative Learning Environments: A Case Study</div>
                      <div className="text-sm font-semibold">76</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Learning Analytics: Methods and Challenges</div>
                      <div className="text-sm font-semibold">65</div>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>

            <DashboardCard title="Estatísticas de Citação">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground">Total de Citações</p>
                  <p className="text-2xl font-semibold">1.876</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground">Média por Publicação</p>
                  <p className="text-2xl font-semibold">13.2</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground">Citações em 2023</p>
                  <p className="text-2xl font-semibold">422</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground">Crescimento Anual</p>
                  <p className="text-2xl font-semibold">+36%</p>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="indices" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <DashboardCard title="Evolução dos Índices">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={indexOverTime}
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
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="h" name="Índice H" stroke="#39934c" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="i10" name="Índice i10" stroke="#3a78b9" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DashboardCard>

              <DashboardCard title="Comparação de Índices">
                <div className="space-y-6 p-4">
                  <div>
                    <h4 className="text-base font-medium mb-2">Índice H</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded-full">
                        +2 em 2023
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      24 publicações com pelo menos 24 citações cada
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-2">Índice i10</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded-full">
                        +4 em 2023
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      42 publicações com pelo menos 10 citações cada
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-2">Fator de Impacto Médio</h4>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">3.78</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Média do fator de impacto dos periódicos onde publicou
                    </p>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RceiLayout>
    </>
  );
};

export default Statistics;