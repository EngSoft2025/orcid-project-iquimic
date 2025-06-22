
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
  Trash2, 
  MessageCircle, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  Filter 
} from "lucide-react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Review {
  id: string;
  publicationTitle: string;
  publicationType: string;
  reviewer: {
    name: string;
    institution: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  date: string;
  status: 'published' | 'pending' | 'rejected';
}

// Mock data
const mockReviews: Review[] = [
  {
    id: "1",
    publicationTitle: "A Systematic Review of Educational Data Mining",
    publicationType: "article",
    reviewer: {
      name: "Maria Oliveira",
      institution: "UFRGS",
      avatar: "",
    },
    rating: 5,
    comment: "Excelente revisão sistemática que aborda os principais aspectos da mineração de dados educacionais. A metodologia é clara e os resultados são bem apresentados.",
    date: "2023-10-15",
    status: "published",
  },
  {
    id: "2",
    publicationTitle: "Application of Machine Learning in Educational Contexts",
    publicationType: "article",
    reviewer: {
      name: "João Silva",
      institution: "UNICAMP",
      avatar: "",
    },
    rating: 4,
    comment: "Artigo muito relevante para o campo. Os métodos de aplicação de aprendizado de máquina são bem descritos, mas poderiam se beneficiar de mais exemplos práticos.",
    date: "2023-09-22",
    status: "published",
  },
  {
    id: "3",
    publicationTitle: "Collaborative Learning Environments: A Case Study",
    publicationType: "conference",
    reviewer: {
      name: "Ana Castro",
      institution: "UFMG",
      avatar: "",
    },
    rating: 3,
    comment: "O estudo de caso apresenta insights interessantes, mas a metodologia poderia ser mais robusta. Recomendo revisar a seção de análise de dados.",
    date: "2023-11-05",
    status: "pending",
  },
  {
    id: "4",
    publicationTitle: "Intelligent Tutoring Systems: Design Principles and Applications",
    publicationType: "article",
    reviewer: {
      name: "Carlos Mendes",
      institution: "PUC-Rio",
      avatar: "",
    },
    rating: 5,
    comment: "Um dos melhores trabalhos que li sobre sistemas tutores inteligentes. Abrangente, bem estruturado e com excelentes contribuições para o campo.",
    date: "2023-08-12",
    status: "published",
  },
  {
    id: "5",
    publicationTitle: "Learning Analytics: Methods and Challenges",
    publicationType: "conference",
    reviewer: {
      name: "Patrícia Santos",
      institution: "UFRJ",
      avatar: "",
    },
    rating: 2,
    comment: "O artigo aborda um tema importante, mas apresenta falhas metodológicas significativas. A revisão de literatura está incompleta e as conclusões não são bem fundamentadas.",
    date: "2023-10-28",
    status: "rejected",
  },
];

export function ReviewsList() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string | null>(null);
  const itemsPerPage = 5;

  // Filter reviews based on selected filter
  const filteredReviews = filter 
    ? mockReviews.filter(review => review.status === filter)
    : mockReviews;
  
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  
  const displayedReviews = filteredReviews.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
      />
    ));
  };

  // Function to get status badge style
  const getStatusBadge = (status: Review['status']) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Publicado</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pendente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejeitado</Badge>;
      default:
        return null;
    }
  };

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
                {filter ? (
                  filter === 'published' ? 'Publicados' : 
                  filter === 'pending' ? 'Pendentes' : 
                  'Rejeitados'
                ) : 'Todos'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter(null)}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('published')}>
                Publicados
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('pending')}>
                Pendentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('rejected')}>
                Rejeitados
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publicação</TableHead>
              <TableHead>Avaliador</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{review.publicationTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.publicationType === "article" ? "Artigo" : 
                       review.publicationType === "conference" ? "Conferência" : 
                       review.publicationType === "book" ? "Livro" : "Capítulo"}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.reviewer.avatar} alt={review.reviewer.name} />
                      <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{review.reviewer.name}</p>
                      <p className="text-xs text-muted-foreground">{review.reviewer.institution}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                      <span className="ml-1 text-sm">({review.rating}/5)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {review.comment}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  {getStatusBadge(review.status)}
                </TableCell>
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
