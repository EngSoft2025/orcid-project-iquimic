import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight, ChevronLeft, Filter,
  MessageCircle
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { getReviews } from "@/services/orcid";

interface Review {
  id: string;
  code: string | null;
  reviewerName: string;
  organization: string;
  date: string;
  reviewType: string;
}

export function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string | null>(null);
  const itemsPerPage = 5;

  const [researcherOrcid, setResearcherOrcid] = useState<string | null>(null);
  useEffect(() => {
    const orcid = localStorage.getItem("selectedResearcherOrcid");
    if (orcid) {
      setResearcherOrcid(orcid);
    }
  }, []);

  useEffect(() => {
    if (!researcherOrcid) return;
    async function fetchData() {
      try {
        const data = await getReviews(researcherOrcid);

        const parsed: Review[] = data.group.flatMap((g: any) =>
          g["peer-review-group"]?.flatMap((prg: any) =>
            prg["peer-review-summary"].map((summary: any) => ({
              id: summary["put-code"]?.toString(),
              code: summary["review-group-id"] || null,
              reviewerName: summary.source?.["source-name"]?.value || "Desconhecido",
              organization: summary["convening-organization"]?.name || "Sem organização",
              date: summary["completion-date"]?.year?.value
                ? summary["completion-date"].year.value.toString()
                : "Desconhecido",
              reviewType: summary["review-type"] || "Desconhecido",
            })) || []
          ) || []
        );

        setReviews(parsed);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError("Erro ao buscar avaliações.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [researcherOrcid]);

  const filteredReviews = filter
    ? reviews.filter((review) => review.reviewType === filter)
    : reviews;

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  const displayedReviews = filteredReviews.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Badge para tipo de review (exemplo)
  const getReviewTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "review":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Review</Badge>;
      case "meta-review":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Meta-Review</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{type}</Badge>;
    }
  };

  return (
    <DashboardCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-rcei-green-500" />
          Comentários e Avaliações
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              {filter ? filter.charAt(0).toUpperCase() + filter.slice(1) : 'Todos'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter(null)}>Todos</DropdownMenuItem>
            {/* Você pode adicionar mais filtros por tipo de review */}
            <DropdownMenuItem onClick={() => setFilter('review')}>Review</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter('meta-review')}>Meta-Review</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando avaliações...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Avaliador</TableHead>
                  <TableHead>Organização</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.code || '—'}</TableCell>
                    <TableCell>{review.reviewerName}</TableCell>
                    <TableCell>{review.organization}</TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>{getReviewTypeBadge(review.reviewType)}</TableCell>
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
        </>
      )}
    </DashboardCard>
  );
}
