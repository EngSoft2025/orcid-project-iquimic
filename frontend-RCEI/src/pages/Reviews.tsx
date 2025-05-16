
import { RceiLayout } from "@/components/RceiLayout";
import { ReviewsList } from "@/components/ReviewsList";
import { Helmet } from "react-helmet";

export default function Reviews() {
  return (
    <>
      <Helmet>
        <title>Avaliações | RCEI</title>
      </Helmet>
      <RceiLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Avaliações</h1>
          <p className="text-muted-foreground">
            Gerencie as avaliações e comentários sobre suas publicações e projetos.
          </p>
          <ReviewsList />
        </div>
      </RceiLayout>
    </>
  );
}
