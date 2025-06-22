
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  BarChart3,
  FileText,
  Network,
  FolderKanban,
  Search,
  MessageSquare,
  Settings,
  Menu,
  X,
  Home,
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const sidebarItems: SidebarItem[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: BarChart3,
    label: "Estatísticas",
    href: "/statistics",
  },
  {
    icon: FileText,
    label: "Publicações",
    href: "/publications",
  },
  {
    icon: Network,
    label: "Colaboradores",
    href: "/network",
  },
  {
    icon: FolderKanban,
    label: "Projetos",
    href: "/projects",
  },
  {
    icon: Search,
    label: "Busca",
    href: "/search",
  },
  {
    icon: MessageSquare,
    label: "Avaliações",
    href: "/reviews",
  },
  {
    icon: Settings,
    label: "Configurações",
    href: "/settings",
  },

  /*{
    icon: UserPlus,
    label: "Cadastro de Usuários",
    href: "/register",
  },*/
];

export function RceiSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const sidebarVisible = isMobile ? isMobileOpen : !isCollapsed;

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-rcei-green-100 hover:bg-rcei-green-200 text-rcei-green-700 p-2 rounded-md transition-colors lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={cn(
          "h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out",
          isCollapsed && !isMobile ? "w-16" : "w-64",
          isMobile && "shadow-xl",
          isMobile && !isMobileOpen && "translate-x-[-100%]"
        )}
      >
        <div className="px-4 py-6 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:cursor-pointer">
              <BookOpen className="h-8 w-8 text-rcei-green-500" />
            </Link>
            <span
              className={cn(
                "font-bold text-xl transition-opacity duration-200",
                isCollapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"
              )}
            >
              RCEI
            </span>
          </div>
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <Menu size={18} /> : <X size={18} />}
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                window.location.pathname === item.href && "bg-sidebar-accent font-medium"
              )}
              onClick={() => isMobile && setIsMobileOpen(false)}
            >
              <item.icon className="h-5 w-5 text-rcei-green-500" />
              <span
                className={cn(
                  "transition-opacity duration-200",
                  isCollapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"
                )}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed && !isMobile ? "ml-16" : "ml-0 lg:ml-64"
        )}
      >
      </div>
    </>
  );
}