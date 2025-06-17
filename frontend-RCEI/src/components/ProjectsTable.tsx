import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderKanban } from "lucide-react";

interface Project {
  id: string;
  name: string;
  //status: "em_andamento" | "concluido" | "planejado";
  progress: number;
  deadline: string;
  members: number;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Desenvolvimento de Sistemas Tutores Inteligentes",
    //status: "em_andamento",
    progress: 75,
    deadline: "2023-12-15",
    members: 5,
  },
  {
    id: "2",
    name: "Análise de Dados Educacionais",
    //status: "em_andamento",
    progress: 40,
    deadline: "2024-03-22",
    members: 3,
  },
  {
    id: "3",
    name: "Interface Adaptativa para Ambientes Virtuais",
    //status: "planejado",
    progress: 0,
    deadline: "2024-06-30",
    members: 4,
  },
  {
    id: "4",
    name: "Mineração de Dados em MOOCs",
    //status: "concluido",
    progress: 100,
    deadline: "2023-10-05",
    members: 2,
  },
];

export function ProjectsTable() {
  /*const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "em_andamento":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Em andamento</Badge>;
      case "concluido":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Concluído</Badge>;
      case "planejado":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Planejado</Badge>;
      default:
        return null;
    }
  }; */

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  return (
    <DashboardCard title="Projetos de Pesquisa" icon={<FolderKanban size={18} />}>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Projeto</TableHead>
              {/*<TableHead>Status</TableHead> */}
              <TableHead>Data de Publicação</TableHead>
              <TableHead>Membros</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                {/*<TableCell>{getStatusBadge(project.status)}</TableCell>*/}
                {/*<TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="h-2 w-[100px]" />
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                </TableCell> */}
                <TableCell>{formatDate(project.deadline)}</TableCell>
                <TableCell>{project.members}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
}