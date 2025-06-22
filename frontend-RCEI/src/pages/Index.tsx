
import { RceiLayout } from "@/components/RceiLayout";
import { StatsSummary } from "@/components/StatsSummary";
import { PublicationsList } from "@/components/PublicationsList";
import { CollaborationNetwork } from "@/components/CollaborationNetwork";
import { ProjectsTable } from "@/components/ProjectsTable";
import { CitationsChart } from "@/components/CitationsChart";
import { RecentNotifications } from "@/components/RecentNotifications";
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

        <StatsSummary />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CitationsChart />
          </div>
          <div className="lg:col-span-1">
            <RecentNotifications />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PublicationsList />
          </div>
          <div className="lg:col-span-1">
            <CollaborationNetwork />
          </div>
        </div>

        <div>
          <ProjectsTable />
        </div>
      </div>
    </RceiLayout>
    </>
  );
};

export default Index;