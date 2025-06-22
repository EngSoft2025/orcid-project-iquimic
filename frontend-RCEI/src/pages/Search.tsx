
import { FormEvent, useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchResearchers } from "@/services/orcid";
import { RceiLayout } from "@/components/RceiLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search as SearchIcon, BookOpen, User, Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

interface TagConfig {
  label: string;
  query: string;
}

const TAGS: TagConfig[] = [
  { label: "Inteligência Artificial", query: 'keyword:"Inteligência Artificial"' },
  { label: "Educação", query: 'keyword:"Educação"' },
  { label: "Data Mining", query: 'keyword:"Data Mining"' },
  {
    label: "Universidade de São Paulo",
    query: 'affiliation-org-name:"Universidade de São Paulo"',
  },
  { label: "Machine Learning", query: 'keyword:"Machine Learning"' },
];


const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchParams] = useSearchParams();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const finalQuery = useMemo(() => {
    const tagQuery = TAGS.filter((t) => activeTags.includes(t.label))
      .map((t) => t.query)
      .join(" ");
    return [searchQuery, tagQuery].filter(Boolean).join(" ");
  }, [searchQuery, activeTags]);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["search", finalQuery],
    queryFn: () => searchResearchers(finalQuery),
    enabled: shouldFetch && finalQuery.trim().length > 0,
  });

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
      setShouldFetch(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (shouldFetch && finalQuery.trim()) {
      refetch();
    }
  }, [finalQuery]);

  const results = (data as any)?.["expanded-result"] ?? [];
  const publications = results.flatMap((r: any) => {
    const titles = Array.isArray(r["work-title"]) ? r["work-title"] : [];
    return titles.map((t: string, idx: number) => ({
      id: `${r["orcid-id"]}-${idx}`,
      title: t,
      authors: [`${r["given-names"] ?? ""} ${r["family-names"] ?? ""}`.trim()],
    }));
  });

  const filteredResults =
    filter === "researchers" || filter === "all" ? results : [];
  const filteredPublications =
    filter === "publications" || filter === "all" ? publications : [];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (finalQuery.trim()) {
      setShouldFetch(true);
      refetch();
    }
  };

  return (
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
                placeholder="Busque por nome, instituição, área de pesquisa ou palavra-chave"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filter} onValueChange={setFilter}>
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
            {TAGS.map((tag) => (
              <Badge
                key={tag.label}
                variant={activeTags.includes(tag.label) ? "default" : "outline"}
                onClick={() => {
                  setActiveTags((prev) =>
                    prev.includes(tag.label)
                      ? prev.filter((t) => t !== tag.label)
                      : [...prev, tag.label]
                  );
                  setShouldFetch(true);
                }}
                className="cursor-pointer hover:bg-muted/50"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
        
        <Tabs defaultValue="researchers" className="w-full">
          <TabsList>
            <TabsTrigger value="researchers" className="flex items-center gap-1">
              <User className="h-4 w-4" /> Pesquisadores ({filteredResults.length})
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> Publicações ({filteredPublications.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1">
              <Book className="h-4 w-4" /> Projetos (0)
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="researchers" className="space-y-4 pt-4">
            {isLoading && (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="p-5">
                    <CardContent className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}

            {error && (
              <DashboardCard>
                <div className="text-center py-8">Erro ao buscar pesquisadores.</div>
              </DashboardCard>
            )}

            {!isLoading && !error &&
              filteredResults.map((r: any) => (
                <Card key={r["orcid-id"]} className="hover:bg-muted/10 cursor-pointer transition-colors">
                  <CardContent className="flex items-center gap-4 p-5">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-rcei-green-100 text-rcei-green-700">
                        {(r["given-names"] ?? "?").charAt(0)}
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
            {isLoading && (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="p-5">
                    <CardContent className="space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </>
            )}

            {error && (
              <DashboardCard>
                <div className="text-center py-8">Erro ao buscar publicações.</div>
              </DashboardCard>
            )}

            {!isLoading && !error &&
              filteredPublications.map((pub) => (
                <Card key={pub.id} className="hover:bg-muted/10 cursor-pointer transition-colors">
                  <CardContent className="p-5">
                    <h3 className="font-medium">{pub.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pub.authors.join(", ")}
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
  );
};

export default Search;