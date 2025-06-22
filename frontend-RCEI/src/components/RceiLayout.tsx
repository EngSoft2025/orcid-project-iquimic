import { ReactNode } from "react";
import { RceiSidebar } from "./RceiSidebar";
import { cn } from "@/lib/utils";
import Navbar from '../components/Navbar';

interface RceiLayoutProps {
  children: ReactNode;
}

export function RceiLayout({ children }: RceiLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <RceiSidebar />
        <main className="flex-1 p-6 lg:p-8 transition-all duration-300 ml-0 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}