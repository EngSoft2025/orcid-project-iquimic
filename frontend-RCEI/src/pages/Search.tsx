import { FormEvent, useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchResearchers, getWorks } from "@/services/orcid";
import { RceiLayout } from "@/components/RceiLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search as SearchIcon, BookOpen, User } from "lucide-react";
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

interface Researcher {
  "orcid-id": string;
  "given-names": string;
  "family-names": string;
  "institution-name"?: string | string[];
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedResearcher, setSelectedResearcher] = useState<Researcher | null>(null);
  const [researcherOrcid, setResearcherOrcid] = useState<string | null>(() => {
    return localStorage.getItem("selectedResearcherOrcid");
  });
  const [activeTab, setActiveTab] = useState<"researchers" | "publications">("researchers");

  const finalQuery = useMemo(() => {
    const tagQs = TAGS.filter(t => activeTags.includes(t.label)).map(t => t.query);
    return [searchQuery, ...tagQs].filter(Boolean).join(" ");
  }, [searchQuery, activeTags]);

  const resQ = useQuery({
    queryKey: ["search-researchers", finalQuery],
    queryFn: () => searchResearchers(finalQuery),
    enabled: shouldFetch && finalQuery.trim().length > 0,
  });

  const worksQuery = useQuery({
    queryKey: ["researcher-works", researcherOrcid],
    queryFn: () => getWorks(researcherOrcid),
    enabled: !!researcherOrcid && activeTab === "publications",
  });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      setSearchQuery(q);
      setShouldFetch(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldFetch) return;
    resQ.refetch();
  }, [finalQuery]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!finalQuery.trim()) return;
    setShouldFetch(true);
    resQ.refetch();
    setActiveTab("researchers");
  }

  const results = (resQ.data?.["expanded-result"] ?? []) as Researcher[];

  const publications = Array.isArray(worksQuery.data?.group)
    ? worksQuery.data.group.map((group: any, i: number) => {
      const summary = group["work-summary"]?.[0];
      return {
        id: summary?.["put-code"]?.toString() || `${i}`,
        title: summary?.title?.title?.value || "Sem título",
        year: summary?.["publication-date"]?.year?.value || "N/A",
        type: summary?.type || "N/A",
        journal: summary?.["journal-title"]?.value || summary?.source?.sourceName || "N/A",
        url: summary?.url?.value || null,
      };
    })
    : [];


  // Quando seleciona pesquisador, muda a aba para "publications" e guarda o orcid no localStorage
  const handleSelectResearcher = (researcher: Researcher) => {
    const orcid = researcher["orcid-id"];
    setSelectedResearcher(researcher);
    setResearcherOrcid(orcid);
    localStorage.setItem("selectedResearcherOrcid", orcid);
    setActiveTab("publications");
  };

  return (
    <>
      <Helmet><title>Busca | RCEI</title></Helmet>
      <RceiLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Busca</h1>
            <p className="text-muted-foreground">Encontre pesquisadores e publicações</p>
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
                    setActiveTab("researchers");
                  }}
                  className="cursor-pointer"
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="researchers" className="flex items-center gap-1">
                <User className="h-4 w-4" /> Pesquisadores ({results.length})
              </TabsTrigger>
              <TabsTrigger value="publications" className="flex items-center gap-1" disabled={!selectedResearcher}>
                <BookOpen className="h-4 w-4" /> Publicações ({publications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="researchers" className="space-y-4 pt-4">
              {resQ.isLoading && Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
              {!resQ.isLoading && results.map(r => (
                <Card
                  key={r["orcid-id"]}
                  className="hover:bg-muted/10 cursor-pointer transition-colors"
                  onClick={() => handleSelectResearcher(r)}
                >
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
              ))}
            </TabsContent>

            <TabsContent value="publications" className="space-y-4 pt-4">
              {worksQuery.isLoading && <Skeleton className="h-4 w-full" />}
              {worksQuery.isError && (
                <DashboardCard>
                  <div className="text-center py-8">Erro ao buscar publicações.</div>
                </DashboardCard>
              )}
              {!worksQuery.isLoading && !worksQuery.isError && publications.length === 0 && (
                <DashboardCard>
                  <div className="text-center py-8">Nenhuma publicação encontrada.</div>
                </DashboardCard>
              )}
              {publications.map(pub => (
                <Card key={pub.id} className="hover:bg-muted/10 transition-colors">
                  <CardContent className="p-5">
                    <h3 className="font-medium">
                      {pub.url ? (
                        <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-rcei-green-500 hover:underline">
                          {pub.title}
                        </a>
                      ) : (
                        pub.title
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {pub.journal} — {pub.year} — {pub.type}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </RceiLayout>
    </>
  );
}
