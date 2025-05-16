
import { RceiLayout } from "@/components/RceiLayout";
import { PublicationsList } from "@/components/PublicationsList";
import { Helmet } from "react-helmet";

export default function Publications() {
  return (
    <>
      <Helmet>
        <title>Publicações | RCEI</title>
      </Helmet>
      <RceiLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Publicações</h1>
          <p className="text-muted-foreground">
            Gerencie suas publicações acadêmicas, artigos e trabalhos científicos.
          </p>
          <PublicationsList />
        </div>
      </RceiLayout>
    </>
  );
}