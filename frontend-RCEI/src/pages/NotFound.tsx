
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RceiLayout } from "@/components/RceiLayout";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <RceiLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Página não encontrada</p>
        <p className="text-center text-muted-foreground max-w-md mb-8">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>
        <Button asChild className="bg-rcei-green-500 hover:bg-rcei-green-600">
          <a href="/">Voltar para o Dashboard</a>
        </Button>
      </div>
    </RceiLayout>
  );
};

export default NotFound;