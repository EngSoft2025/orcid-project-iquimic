import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, MessageCircle, Star, ChevronRight, ChevronLeft, Filter } from "lucide-react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getPeerReviews, DEFAULT_ORCID } from "@/services/orcid";

interface Review {
  id: string;
  title: string;
  date?: string;
  reviewer?: string;
  type?: string;
}

export function ReviewsList() {
  const { data } = useQuery({
    queryKey: ["peer-reviews", DEFAULT_ORCID],
    queryFn: () => getPeerReviews(DEFAULT_ORCID),
  });

  const reviews: Review[] =
    data?.["peer-review-groups"]?.["peer-review-group"]?.map((g: any) => {
      const pr = g["peer-review-summary"][0];
      return {
        id: String(pr["put-code"]),
        title: pr?.reviewSubject?.title?.title?.value ?? "",
        date: pr?.completionDate?.year?.value,
        reviewer: pr?.reviewerRole?.value,
        type: pr?.reviewType?.value,
      };
    }) ?? [];

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string | null>(null);
  const itemsPerPage = 5;

  const filteredReviews = reviews.filter(() => true);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const displayedReviews = filteredReviews.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const renderStars = () => Array(5).fill(0).map((_, i) => <Star key={i} size={16} className="text-gray-300" />);

  return (
    <DashboardCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-rcei-green-500" />
          Comentários e Avaliações
        </h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                {filter ? filter : 'Todos'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter(null)}>Todos</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publicação</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.title}</TableCell>
                <TableCell>{review.type}</TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
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
