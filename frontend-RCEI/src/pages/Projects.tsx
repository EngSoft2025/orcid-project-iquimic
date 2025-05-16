
import { RceiLayout } from "@/components/RceiLayout";
import { ProjectsTable } from "@/components/ProjectsTable";
import { Helmet } from "react-helmet";

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Projetos | RCEI</title>
      </Helmet>
      <RceiLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Projetos de Pesquisa</h1>
          <p className="text-muted-foreground">
            Gerencie seus projetos de pesquisa acadêmica, acompanhe o progresso e colaboradores.
          </p>
          <ProjectsTable />
        </div>
      </RceiLayout>
    </>
  );
}