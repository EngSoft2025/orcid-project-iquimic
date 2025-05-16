
import { useState } from "react";
import { RceiLayout } from "@/components/RceiLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, BookOpen, User, Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Researcher {
  id: string;
  name: string;
  institution: string;
  area: string;
  publications: number;
  hIndex: number;
  avatar?: string;
}

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  citations: number;
}

const mockResearchers: Researcher[] = [
  {
    id: "1",
    name: "Prof. Seiji Isotani",
    institution: "Universidade de São Paulo",
    area: "Informática na Educação",
    publications: 142,
    hIndex: 24,
  },
  {
    id: "2",
    name: "Maria Silva",
    institution: "Universidade Federal de São Carlos",
    area: "Inteligência Artificial",
    publications: 87,
    hIndex: 15,
  },
  {
    id: "3",
    name: "João Santos",
    institution: "Universidade Estadual de Campinas",
    area: "Engenharia de Software",
    publications: 65,
    hIndex: 12,
  },
];

const mockPublications: Publication[] = [
  {
    id: "1",
    title: "A Systematic Review of Educational Data Mining",
    authors: ["Seiji Isotani", "Maria Silva"],
    journal: "IEEE Transactions on Education",
    year: 2023,
    citations: 12,
  },
  {
    id: "2",
    title: "Machine Learning for Educational Assessment",
    authors: ["João Santos", "Seiji Isotani"],
    journal: "Computers & Education",
    year: 2022,
    citations: 98,
  },
  {
    id: "3",
    title: "Learning Analytics: Methods and Challenges",
    authors: ["Maria Silva", "Ana Costa"],
    journal: "International Conference on Learning Analytics",
    year: 2022,
    citations: 65,
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

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
          <div className="flex flex-col md:flex-row gap-4">
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
              <Button className="bg-rcei-green-500 hover:bg-rcei-green-600">
                Buscar
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted/50">
              Inteligência Artificial
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted/50">
              Educação
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted/50">
              Data Mining
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted/50">
              Universidade de São Paulo
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted/50">
              Machine Learning
            </Badge>
          </div>
        </div>
        
        <Tabs defaultValue="researchers" className="w-full">
          <TabsList>
            <TabsTrigger value="researchers" className="flex items-center gap-1">
              <User className="h-4 w-4" /> Pesquisadores
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> Publicações
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1">
              <Book className="h-4 w-4" /> Projetos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="researchers" className="space-y-4 pt-4">
            {mockResearchers.map((researcher) => (
              <Card key={researcher.id} className="hover:bg-muted/10 cursor-pointer transition-colors">
                <CardContent className="flex items-center gap-4 p-5">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={researcher.avatar} />
                    <AvatarFallback className="bg-rcei-green-100 text-rcei-green-700">
                      {researcher.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{researcher.name}</h3>
                    <p className="text-sm text-muted-foreground">{researcher.institution}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{researcher.area}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{researcher.publications}</p>
                      <p className="text-xs text-muted-foreground">Publicações</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{researcher.hIndex}</p>
                      <p className="text-xs text-muted-foreground">Índice H</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="publications" className="space-y-4 pt-4">
            {mockPublications.map((publication) => (
              <Card key={publication.id} className="hover:bg-muted/10 cursor-pointer transition-colors">
                <CardContent className="p-5">
                  <h3 className="font-medium">{publication.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {publication.authors.join(", ")}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-rcei-blue-100 text-rcei-blue-700 px-2 py-1 rounded">
                        {publication.journal}
                      </span>
                      <span className="text-xs">{publication.year}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span className="text-sm font-medium">{publication.citations}</span>
                      <span className="text-xs">citações</span>
                    </div>
                  </div>
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