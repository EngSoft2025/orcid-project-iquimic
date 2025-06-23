
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
  ChevronRight, 
  ChevronLeft, 
  Users,
  Mail,
  ExternalLink
} from "lucide-react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Collaborator {
  id: string;
  name: string;
  institution: string;
  department: string;
  position: string;
  email: string;
  collaborationCount: number;
  country: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

// Mock data
const mockCollaborators: Collaborator[] = [
  {
    id: "1",
    name: "Maria Silva",
    institution: "Universidade de São Paulo",
    department: "Instituto de Ciências Matemáticas e de Computação",
    position: "Professor Associado",
    email: "maria.silva@usp.br",
    collaborationCount: 12,
    country: "Brasil",
    avatar: "",
    status: "active",
  },
  {
    id: "2",
    name: "João Santos",
    institution: "Stanford University",
    department: "Computer Science",
    position: "Assistant Professor",
    email: "jsantos@stanford.edu",
    collaborationCount: 8,
    country: "Estados Unidos",
    avatar: "",
    status: "active",
  },
  {
    id: "3",
    name: "Ana Costa",
    institution: "Universidade Federal do Rio Grande do Sul",
    department: "Informática Educativa",
    position: "Professor Adjunto",
    email: "ana.costa@ufrgs.br",
    collaborationCount: 5,
    country: "Brasil",
    avatar: "",
    status: "active",
  },
  {
    id: "4",
    name: "Pedro Lima",
    institution: "Massachusetts Institute of Technology",
    department: "Media Lab",
    position: "Research Scientist",
    email: "plima@mit.edu",
    collaborationCount: 3,
    country: "Estados Unidos",
    avatar: "",
    status: "inactive",
  },
  {
    id: "5",
    name: "Laura Oliveira",
    institution: "Universidade de Campinas",
    department: "Faculdade de Educação",
    position: "Professor Doutor",
    email: "laura.oliveira@unicamp.br",
    collaborationCount: 7,
    country: "Brasil",
    avatar: "",
    status: "active",
  },
];

export function CollaboratorsList() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockCollaborators.length / itemsPerPage);
  
  const displayedCollaborators = mockCollaborators.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('');
  };

  return (
    <DashboardCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-rcei-green-500" />
          Colaboradores
        </h2>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead>Instituição</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Colaborações</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedCollaborators.map((collaborator) => (
              <TableRow key={collaborator.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                      <AvatarFallback>{getInitials(collaborator.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{collaborator.name}</p>
                      <p className="text-xs text-muted-foreground">{collaborator.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>{collaborator.institution}</p>
                    <p className="text-xs text-muted-foreground">{collaborator.department}</p>
                  </div>
                </TableCell>
                <TableCell>{collaborator.position}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-rcei-blue-100 text-rcei-blue-700">
                    {collaborator.collaborationCount} publicações
                  </Badge>
                </TableCell>
                <TableCell>
                  {collaborator.status === "active" ? (
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1 justify-end">
                    <Button variant="ghost" size="icon" title="Enviar e-mail">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Ver perfil">
                      <ExternalLink className="h-4 w-4" />
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
