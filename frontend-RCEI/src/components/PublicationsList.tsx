import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronRight, ChevronLeft
} from "lucide-react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { getWorks } from "@/services/orcid";

interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  type: "article" | "book" | "conference" | "chapter" | "other";
  url?: string | null;  // opcional
}

const typeMap: Record<string, Publication["type"]> = {
  "journal-article": "article",
  "book": "book",
  "conference-paper": "conference",
  "book-chapter": "chapter"
};

export function PublicationsList() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [researcherOrcid, setResearcherOrcid] = useState<string | null>(null);
  useEffect(() => {
    const orcid = localStorage.getItem("selectedResearcherOrcid");
    if (orcid) {
      setResearcherOrcid(orcid);
    }
  }, []);

  const totalPages = Math.ceil(publications.length / itemsPerPage);
  const displayedPublications = publications.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    if (!researcherOrcid) return;
    async function loadData() {
      try {
        const data = await getWorks(researcherOrcid);

        const transformed: Publication[] = (data.group || []).map((group: any, index: number) => {
          const summary = group["work-summary"]?.[0];
          const title = summary?.title?.title?.value || "Sem título";
          const journal = summary?.["journal-title"]?.value || "Não especificado";
          const year = parseInt(summary?.["publication-date"]?.year?.value) || 0;
          const typeRaw = summary?.type || "other";
          const type = typeMap[typeRaw] || "other";
          const url = summary?.url?.value || null;  // pega a url, se existir

          return {
            id: summary["put-code"]?.toString() || `${index}`,
            title,
            journal,
            year,
            type,
            url,    // adiciona url ao objeto
          };
        });


        setPublications(transformed);
      } catch (err) {
        console.error("Erro ao carregar publicações", err);
      }
    }

    loadData();
  }, [researcherOrcid]);

  const typeColors = {
    article: "bg-blue-100 text-blue-800",
    book: "bg-green-100 text-green-800",
    conference: "bg-amber-100 text-amber-800",
    chapter: "bg-purple-100 text-purple-800",
    other: "bg-gray-100 text-gray-800"
  };

  return (
    <DashboardCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Publicações Recentes</h2>
        <Dialog>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Publicação</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 py-4">
              {/* formulário omitido */}
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedPublications.map((pub) => (
              <TableRow key={pub.id}>
                <TableCell className="font-medium">
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rcei-green-500 hover:underline"
                    >
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </TableCell>
                <TableCell>{pub.journal}</TableCell>
                <TableCell>{pub.year || "N/A"}</TableCell>
                <TableCell>
                  <Badge className={typeColors[pub.type]} variant="outline">
                    {{
                      article: "Artigo",
                      book: "Livro",
                      conference: "Conferência",
                      chapter: "Capítulo",
                      other: "Outro"
                    }[pub.type]}
                  </Badge>
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
