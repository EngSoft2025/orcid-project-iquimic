
import { Award, BookMarked, MessageSquare } from "lucide-react";

export function StatsSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="bg-white rounded-lg p-6 shadow-sm border flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-rcei-green-100 flex items-center justify-center text-rcei-green-600">
          <BookMarked size={24} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total de Publicações</p>
          <p className="text-2xl font-bold">142</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-rcei-blue-100 flex items-center justify-center text-rcei-blue-600">
          <MessageSquare size={24} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Citações</p>
          <p className="text-2xl font-bold">1.876</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-rcei-green-100 flex items-center justify-center text-rcei-green-600">
          <Award size={24} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Índice H</p>
          <p className="text-2xl font-bold">24</p>
        </div>
      </div>
    </div>
  );
}