import { FormEvent, useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchResearchers, searchProjects, getWorks, getFundings } from "@/services/orcid"; // Importe as funções getWorks e getFundings
import { RceiLayout } from "@/components/RceiLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search as SearchIcon, BookOpen, User, Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";

interface TagConfig {
  label: string;
  query: string;
}

const TAGS: TagConfig[] = [
  { label: "Inteligência Artificial", query: 'keyword:"Inteligência Artificial"' },
  { label: "Educação", query: 'keyword:"Educação"' },
  { label: "Data Mining", query: 'keyword:"Data Mining"' },
  { label: "Universidade de São Paulo", query: 'affiliation-org-name:"Universidade de São Paulo"' },
  { label: "Machine Learning", query: 'keyword:"Machine Learning"' },
];

type Filter = "all" | "researchers" | "publications" | "projects";

interface Researcher {
  "orcid-id": string;
  "given-names": string;
  "family-names": string;
  "institution-name"?: string | string[];
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const [selectedResearcher, setSelectedResearcher] = useState<Researcher | null>(null); // Armazena o pesquisador selecionado
  const [researcherOrcid, setResearcherOrcid] = useState<string | null>(null); // Armazena o orcid do pesquisador selecionado

  // Monta a query combinando texto e tags
  const finalQuery = useMemo(() => {
    const tagQs = TAGS.filter(t => activeTags.includes(t.label)).map(t => t.query);
    return [searchQuery, ...tagQs].filter(Boolean).join(" ");
  }, [searchQuery, activeTags]);

  // React Query: pesquisadores
  const resQ = useQuery({
    queryKey: ["search-researchers", finalQuery],
    queryFn: () => searchResearchers(finalQuery),
    enabled: shouldFetch && finalQuery.trim().length > 0,
  });

  // React Query: projetos (financiamentos)
  const projQ = useQuery({
    queryKey: ["search-projects", finalQuery],
    queryFn: () => searchProjects(finalQuery),
    enabled: shouldFetch && filter === "projects" && finalQuery.trim().length > 0,
  });

  // Novo: React Query para buscar as obras do pesquisador selecionado
  const worksQuery = useQuery({
    queryKey: ["researcher-works", researcherOrcid],
    queryFn: () => getWorks(researcherOrcid),
    enabled: !!researcherOrcid, // Só busca se tiver um ORCID ID selecionado
  });

  // Novo: React Query para buscar os fundings do pesquisador selecionado
    const fundingsQuery = useQuery({
    queryKey: ["researcher-fundings", researcherOrcid],
    queryFn: () => getFundings(researcherOrcid),
    enabled: !!researcherOrcid, // Só busca se tiver um ORCID ID selecionado
  });

  // Dispara busca inicial pelo parâmetro ?q=
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      setSearchQuery(q);
      setShouldFetch(true);
    }
  }, []);

  // Re-executa a busca quando muda a query ou a aba
  useEffect(() => {
    if (!shouldFetch) return;
    if (filter === "projects") projQ.refetch();
    else resQ.refetch();
  }, [finalQuery, filter]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!finalQuery.trim()) return;
    setShouldFetch(true);
    filter === "projects" ? projQ.refetch() : resQ.refetch();
  }

  // Dados extraídos
  const results = (resQ.data?.["expanded-result"] ?? []) as Researcher[];
  const filteredResults = (filter === "researchers" || filter === "all") ? results : [];

  const publications = results.flatMap((r: any, i: number) =>
    (Array.isArray(r["work-title"]) ? r["work-title"] : []).map((t: string, j: number) => ({
      id: `${r["orcid-id"]}-${i}-${j}`,
      title: t,
      authors: [`${r["given-names"] ?? ""} ${r["family-names"] ?? ""}`.trim()],
    }))
  );
  const filteredPublications = (filter === "publications" || filter === "all") ? publications : [];

  const projResults = projQ.data?.["expanded-result"] ?? [];
  const projects = projResults.map((p: any, i: number) => ({
    id: `${p["orcid-id"] ?? "proj"}-${i}`,
    title: Array.isArray(p["funding-title"])
      ? p["funding-title"][0]
      : p["funding-title"],
    start: Array.isArray(p["start-year"])
      ? p["start-year"][0]
      : p["start-year"],
    contributors: Array.isArray(p["contributor-credit-name"])
      ? p["contributor-credit-name"]
      : [],
  }));
  const filteredProjects = (filter === "projects" || filter === "all") ? projects : [];

  // Função para lidar com a seleção de um pesquisador
  const handleSelectResearcher = (researcher: Researcher) => {
    setSelectedResearcher(researcher);
    setResearcherOrcid(researcher["orcid-id"]); // Define o ORCID ID
  };

  // Função para contar itens em um array ou retornar 0 se não for array ou se for undefined
  const getItemCount = (data: any): number => {
    return Array.isArray(data) ? data.length : 0;
  };

  // Obtém as obras e os fundings (para facilitar a contagem)
  const worksData = worksQuery.data;
  const fundingsData = fundingsQuery.data;

  // Conta as obras e os fundings
  const worksCount = getItemCount(worksData);
  const fundingsCount = getItemCount(fundingsData);

  return (
    <>
    <Helmet>
      <title>Busca | RCEI</title>
    </Helmet>
    <RceiLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Busca</h1>
          <p className="text-muted-foreground">
            Encontre pesquisadores, publicações e projetos
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Busque por nome, instituição ou palavra-chave"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filter} onValueChange={v => setFilter(v as Filter)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="researchers">Pesquisadores</SelectItem>
                  <SelectItem value="publications">Publicações</SelectItem>
                  <SelectItem value="projects">Projetos</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="bg-rcei-green-500 hover:bg-rcei-green-600">
                Buscar
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2 mt-4">
            {TAGS.map(tag => (
              <Badge
                key={tag.label}
                variant={activeTags.includes(tag.label) ? "default" : "outline"}
                onClick={() => {
                  setActiveTags(prev =>
                    prev.includes(tag.label)
                      ? prev.filter(x => x !== tag.label)
                      : [...prev, tag.label]
                  );
                  setShouldFetch(true);
                }}
                className="cursor-pointer"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Exibe informações do pesquisador selecionado */}
        {selectedResearcher && (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-4">
              Pesquisador Selecionado: {selectedResearcher["given-names"]} {selectedResearcher["family-names"]}
            </h2>
            <p>ORCID ID: {selectedResearcher["orcid-id"]}</p>

             {/* Seções de Publicações e Projetos (Fundings) */}
            <h3 className="text-lg font-semibold mt-4">Publicações ({worksCount})</h3>
            {worksQuery.isLoading && <p>Carregando publicações...</p>}
            {worksQuery.isError && <p>Erro ao carregar publicações.</p>}
            {/* Verifica se worksQuery.data é um array antes de usar .map */}
            {worksQuery.data && Array.isArray(worksQuery.data) ? (
                <ul>
                {worksQuery.data.map((work: any) => (
                    <li key={work.id}>{work.title}</li> // Ajuste conforme a estrutura real dos dados
                ))}
                </ul>
            ) : (
                <p>Nenhuma publicação encontrada.</p>
            )}

            <h3 className="text-lg font-semibold mt-4">Projetos (Fundings) ({fundingsCount})</h3>
            {fundingsQuery.isLoading && <p>Carregando projetos...</p>}
            {fundingsQuery.isError && <p>Erro ao carregar projetos.</p>}
            {/* Verifica se fundingsQuery.data é um array antes de usar .map */}
            {fundingsQuery.data && Array.isArray(fundingsQuery.data) ? (
                <ul>
                {fundingsQuery.data.map((funding: any) => (
                    <li key={funding.id}>{funding.title}</li> // Ajuste conforme a estrutura real dos dados
                ))}
                </ul>
            ) : (
                <p>Nenhum projeto encontrado.</p>
            )}
          </div>
        )}

        <Tabs defaultValue="researchers" className="w-full">
          <TabsList>
            <TabsTrigger value="researchers" className="flex items-center gap-1">
              <User className="h-4 w-4" /> Pesquisadores ({filteredResults.length})
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> Publicações ({filteredPublications.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1">
              <Book className="h-4 w-4" /> Projetos ({filteredProjects.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="researchers" className="space-y-4 pt-4">
            {resQ.isLoading && Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
            {resQ.isError && (
              <DashboardCard>
                <div className="text-center py-8">Erro ao buscar pesquisadores.</div>
              </DashboardCard>
            )}
            {!resQ.isLoading && !resQ.isError &&
              filteredResults.map(r => (
                <Card key={r["orcid-id"]} className="hover:bg-muted/10 cursor-pointer transition-colors"  onClick={() => handleSelectResearcher(r)}>
                  <CardContent className="flex items-center gap-4 p-5">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-rcei-green-100 text-rcei-green-700">
                        {(r["given-names"] ?? "?")[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">
                        {`${r["given-names"] ?? ""} ${r["family-names"] ?? ""}`.trim()}
                      </h3>
                      {r["institution-name"] && (
                        <p className="text-sm text-muted-foreground">
                          {Array.isArray(r["institution-name"])
                            ? r["institution-name"][0]
                            : r["institution-name"]}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            }
          </TabsContent>

          <TabsContent value="publications" className="space-y-4 pt-4">
            {resQ.isLoading && Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
            {resQ.isError && (
              <DashboardCard>
                <div className="text-center py-8">Erro ao buscar publicações.</div>
              </DashboardCard>
            )}
            {!resQ.isLoading && !resQ.isError &&
              filteredPublications.map(pub => (
                <Card key={pub.id} className="hover:bg-muted/10 cursor-pointer transition-colors">
                  <CardContent className="p-5">
                    <h3 className="font-medium">{pub.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{pub.authors.join(", ")}</p>
                  </CardContent>
                </Card>
              ))
            }
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 pt-4">
            {projQ.isLoading && Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
            {projQ.isError && (
              <DashboardCard>
                <div className="text-center py-8">Erro ao buscar projetos.</div>
              </DashboardCard>
            )}
            {!projQ.isLoading && !projQ.isError &&
              filteredProjects.map(proj => (
                <Card key={proj.id} className="hover:bg-muted/10 cursor-pointer transition-colors">
                  <CardContent className="p-5">
                    <h3 className="font-medium">{proj.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {proj.start ?? ""}{proj.contributors.length > 0 && `– ${proj.contributors.join(", ")}`}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="projects" className="pt-4">
            <DashboardCard>
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Nenhum projeto encontrado</h3>
                <p className="text-muted-foreground mt-2">
                  Tente ajustar seus critérios de busca
                </p>
              </div>
            </DashboardCard>
          </TabsContent>
        </Tabs>
      </div>
    </RceiLayout>
    </>
  );
}