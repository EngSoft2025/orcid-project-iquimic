
import { ReactNode } from "react";
import { RceiSidebar } from "./RceiSidebar";
import { cn } from "@/lib/utils";

interface RceiLayoutProps {
  children: ReactNode;
}

export function RceiLayout({ children }: RceiLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <RceiSidebar />
      <main className="flex-1 p-6 lg:p-8 pt-16 lg:pt-8 transition-all duration-300 ml-0 lg:ml-64">
        {children}
      </main>
    </div>
  );
}