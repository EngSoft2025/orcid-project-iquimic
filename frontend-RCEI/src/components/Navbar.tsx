import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full bg-green-700 text-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">RCEI - Repositório Ciêntífico e Educacional Integrado</h1>

                <Link to="/dashboard" className="hover:text-gray-200 transition-colors">
                    <UserCircle className="w-7 h-7" />
                </Link>
            </div>
        </nav>
    );
}