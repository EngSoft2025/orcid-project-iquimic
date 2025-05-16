
import { RceiLayout } from "@/components/RceiLayout";
import { CollaborationNetwork } from "@/components/CollaborationNetwork";
import { CollaboratorsList } from "@/components/CollaboratorsList";
import { Helmet } from "react-helmet";

export default function Network() {
  return (
    <>
      <Helmet>
        <title>Rede de Colaboradores | RCEI</title>
      </Helmet>
      <RceiLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Rede de Colaboradores</h1>
          <p className="text-muted-foreground">
            Visualize sua rede de colaboração acadêmica e gerencie parcerias de pesquisa.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-3">
              <CollaborationNetwork />
            </div>
          </div>
          <CollaboratorsList />
        </div>
      </RceiLayout>
    </>
  );
}