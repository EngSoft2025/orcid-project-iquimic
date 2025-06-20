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
import { useQuery } from "@tanstack/react-query";
import { getWorks, DEFAULT_ORCID } from "@/services/orcid";

interface Collaborator {
  id: string;
  name: string;
  collaborationCount: number;
}

export function CollaboratorsList() {
  const { data } = useQuery({
    queryKey: ["works", DEFAULT_ORCID],
    queryFn: () => getWorks(DEFAULT_ORCID),
  });

  const collaboratorsMap: Record<string, Collaborator> = {};

  data?.works?.group?.forEach((g: any) => {
    g["work-summary"].forEach((w: any) => {
      const contribs = w?.contributors?.contributor ?? [];
      contribs.forEach((c: any) => {
        const name = c?.creditName?.value;
        if (name && name !== c?.orcid?.path) {
          if (!collaboratorsMap[name]) {
            collaboratorsMap[name] = { id: name, name, collaborationCount: 0 };
          }
          collaboratorsMap[name].collaborationCount += 1;
        }
      });
    });
  });

  const collaborators = Object.values(collaboratorsMap);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(collaborators.length / itemsPerPage);
  const displayedCollaborators = collaborators.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("");

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
              <TableHead>Colaborações</TableHead>
              <TableHead className="w-[120px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedCollaborators.map((collaborator) => (
              <TableRow key={collaborator.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage alt={collaborator.name} />
                      <AvatarFallback>{getInitials(collaborator.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{collaborator.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-rcei-blue-100 text-rcei-blue-700">
                    {collaborator.collaborationCount} publicações
                  </Badge>
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
