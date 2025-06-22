
import { DashboardCard } from "@/components/ui/dashboard-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderKanban } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSelfFundings } from "@/services/orcid"; // <-- função certa agora

interface Project {
  id: string;
  name: string;
  status: "em_andamento" | "concluido" | "planejado";
  progress: number;
  deadline: string;
  members: number;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Desenvolvimento de Sistemas Tutores Inteligentes",
    status: "em_andamento",
    progress: 75,
    deadline: "2023-12-15",
    members: 5,
  },
  {
    id: "2",
    name: "Análise de Dados Educacionais",
    status: "em_andamento",
    progress: 40,
    deadline: "2024-03-22",
    members: 3,
  },
  {
    id: "3",
    name: "Interface Adaptativa para Ambientes Virtuais",
    status: "planejado",
    progress: 0,
    deadline: "2024-06-30",
    members: 4,
  },
  {
    id: "4",
    name: "Mineração de Dados em MOOCs",
    status: "concluido",
    progress: 100,
    deadline: "2023-10-05",
    members: 2,
  },
];

export function ProjectsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["self-fundings"],
    queryFn: getSelfFundings,
  });

  const projects: Project[] =
    data?.funding?.group?.map((g: any) => {
      const summary = g["funding-summary"]?.[0];
      return {
        id: String(summary["put-code"]),
        name: summary?.title?.title?.value ?? "",
        start: summary?.startDate?.year?.value,
        members:
          summary?.contributors?.contributor?.length ??
          summary?.contributors?.length ??
          0,
      };
    }) ?? [];

  const formatDate = (year?: string) => {
    if (!year) return "";
    return year;
  };

  return (
    <DashboardCard title="Projetos de Pesquisa" icon={<FolderKanban size={18} />}>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Projeto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Membros</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>Carregando projetos...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3}>Erro ao carregar projetos.</TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>Nenhum projeto encontrado.</TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{formatDate(project.start)}</TableCell>
                  <TableCell>{project.members}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
}
