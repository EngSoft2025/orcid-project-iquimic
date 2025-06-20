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
import { useQuery } from "@tanstack/react-query";
import { getWorks, DEFAULT_ORCID } from "@/services/orcid";

interface Publication {
  id: string;
  title: string;
  journal?: string;
  year?: number;
  type?: string;
}

export function PublicationsList() {
  const { data } = useQuery({
    queryKey: ["works", DEFAULT_ORCID],
    queryFn: () => getWorks(DEFAULT_ORCID),
  });

  const works: Publication[] =
    data?.works?.group?.flatMap((g: any) =>
      g["work-summary"].map((w: any) => ({
        id: w["put-code"],
        title: w?.title?.title?.value ?? "",
        journal: w?.journalTitle?.value,
        year: Number(w?.publicationDate?.year?.value),
        type: w?.type,
      })) ?? []
    ) ?? [];

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(works.length / itemsPerPage);

  const displayed = works.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const typeColors: Record<string, string> = {
    JOURNAL_ARTICLE: "bg-blue-100 text-blue-800",
    BOOK: "bg-green-100 text-green-800",
    CONFERENCE_PAPER: "bg-amber-100 text-amber-800",
    BOOK_CHAPTER: "bg-purple-100 text-purple-800",
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
              {/* form fields omitted */}
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
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayed.map((pub) => (
              <TableRow key={pub.id}>
                <TableCell className="font-medium">{pub.title}</TableCell>
                <TableCell>{pub.journal}</TableCell>
                <TableCell>{pub.year}</TableCell>
                <TableCell>
                  <Badge className={typeColors[pub.type ?? ""]} variant="outline">
                    {pub.type}
                  </Badge>
                </TableCell>
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
          <div className="text-sm">Página {page} de {totalPages}</div>
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
