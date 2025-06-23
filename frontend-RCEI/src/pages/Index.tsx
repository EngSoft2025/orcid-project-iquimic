import { RceiLayout } from "@/components/RceiLayout";
import { PublicationsList } from "@/components/PublicationsList";
import { ProjectsTable } from "@/components/ProjectsTable";
import { PersonalInfo } from "@/components/PersonalInfo";
import { EducationsList } from "@/components/EducationsList";
import { ReviewsList } from "@/components/ReviewsList";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | RCEI</title>
      </Helmet>
      <RceiLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao RCEI - Visualize e gerencie suas informações acadêmicas
            </p>
          </div>

          {/* Novo componente que mostra os dados pessoais */}
          <PersonalInfo />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PublicationsList />
            </div>
            <div className="lg:col-span-1">
              <EducationsList />
            </div>
          </div>

          <ReviewsList />

          <div>
            <ProjectsTable />
          </div>
        </div>
      </RceiLayout>
    </>
  );
};

export default Index;
