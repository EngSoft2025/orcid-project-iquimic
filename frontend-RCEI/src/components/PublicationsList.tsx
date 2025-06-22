
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  FileEdit, 
  Trash2, 
  Eye, 
  ChevronRight, 
  ChevronLeft, 
  PlusCircle 
} from "lucide-react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  type: "article" | "book" | "conference" | "chapter";
  citations: number;
}

// Mock data
const mockPublications: Publication[] = [
  {
    id: "1",
    title: "A Systematic Review of Educational Data Mining",
    journal: "IEEE Transactions on Education",
    year: 2023,
    type: "article",
    citations: 12,
  },
  {
    id: "2",
    title: "Application of Machine Learning in Educational Contexts",
    journal: "Journal of Educational Technology",
    year: 2022,
    type: "article",
    citations: 8,
  },
  {
    id: "3",
    title: "Collaborative Learning Environments: A Case Study",
    journal: "Educational Technology & Society",
    year: 2023,
    type: "conference",
    citations: 5,
  },
  {
    id: "4",
    title: "Intelligent Tutoring Systems: Design Principles and Applications",
    journal: "Computers & Education",
    year: 2021,
    type: "article",
    citations: 19,
  },
  {
    id: "5",
    title: "Learning Analytics: Methods and Challenges",
    journal: "International Conference on Learning Analytics",
    year: 2022,
    type: "conference",
    citations: 7,
  },
];

export function PublicationsList() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockPublications.length / itemsPerPage);
  
  const displayedPublications = mockPublications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const typeColors = {
    article: "bg-blue-100 text-blue-800",
    book: "bg-green-100 text-green-800",
    conference: "bg-amber-100 text-amber-800",
    chapter: "bg-purple-100 text-purple-800",
  };

  return (
    <DashboardCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Publicações Recentes</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-rcei-green-500 hover:bg-rcei-green-600">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Publicação</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Título</label>
                  <input 
                    id="title" 
                    className="w-full p-2 border rounded-md" 
                    placeholder="Título da publicação" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="journal" className="text-sm font-medium">Periódico/Evento</label>
                    <input 
                      id="journal" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="Nome do periódico ou evento" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="year" className="text-sm font-medium">Ano</label>
                    <input 
                      id="year" 
                      type="number" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="Ano de publicação" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="type" className="text-sm font-medium">Tipo</label>
                    <select id="type" className="w-full p-2 border rounded-md">
                      <option value="article">Artigo</option>
                      <option value="conference">Conferência</option>
                      <option value="book">Livro</option>
                      <option value="chapter">Capítulo</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="citations" className="text-sm font-medium">Citações</label>
                    <input 
                      id="citations" 
                      type="number" 
                      className="w-full p-2 border rounded-md" 
                      placeholder="Número de citações" 
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="abstract" className="text-sm font-medium">Resumo</label>
                  <textarea 
                    id="abstract" 
                    className="w-full p-2 border rounded-md" 
                    rows={4}
                    placeholder="Resumo da publicação" 
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="authors" className="text-sm font-medium">Autores</label>
                  <input 
                    id="authors" 
                    className="w-full p-2 border rounded-md" 
                    placeholder="Lista de autores separados por vírgula" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button">Cancelar</Button>
                <Button className="bg-rcei-green-500 hover:bg-rcei-green-600" type="button">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Periódico</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Citações</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedPublications.map((pub) => (
              <TableRow key={pub.id}>
                <TableCell className="font-medium">{pub.title}</TableCell>
                <TableCell>{pub.journal}</TableCell>
                <TableCell>{pub.year}</TableCell>
                <TableCell>
                  <Badge className={typeColors[pub.type]} variant="outline">
                    {pub.type === "article" && "Artigo"}
                    {pub.type === "book" && "Livro"}
                    {pub.type === "conference" && "Conferência"}
                    {pub.type === "chapter" && "Capítulo"}
                  </Badge>
                </TableCell>
                <TableCell>{pub.citations}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            Página {page} de {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </DashboardCard>
  );
}
