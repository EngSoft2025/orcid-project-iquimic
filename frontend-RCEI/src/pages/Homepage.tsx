import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Zap, Users, Award } from 'lucide-react';

const FeatureCard = ({ icon, title, description }: {
    icon: React.ReactNode;
    title: string;
    description: string
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white mb-5">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
};

const TestimonialCard = ({ content, author, role, company }: {
    content: string;
    author: string;
    role: string;
    company: string
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4">
                <svg className="h-8 w-8 text-green-500 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
            </div>
            <p className="text-gray-700 mb-4">{content}</p>
            <div>
                <p className="font-semibold text-gray-800">{author}</p>
                <p className="text-gray-500 text-sm">{role}, {company}</p>
            </div>
        </div>
    );
};

const Homepage = () => {
    const navigate = useNavigate();
    const [testimonials, setTestimonials] = React.useState([
        {
            content: "O RCEI tem sido uma ferramenta inestimável para minha pesquisa. A interface é intuitiva e fácil de usar.",
            author: "Maria Silva",
            role: "Pesquisadora",
            company: "Universidade Estadual"
        },
        {
            content: "Com o RCEI, encontrei publicações relevantes que antes me passariam despercebidas.",
            author: "Carlos Alberto",
            role: "Professor",
            company: "Instituto Federal"
        },
        {
            content: "O RCEI me ajudou a avaliar o impacto de minhas publicações de forma rápida e precisa.",
            author: "Ana Paula",
            role: "Doutoranda",
            company: "Universidade Federal"
        }
    ]);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchTerm = (event.target as HTMLFormElement).search.value;
        if (searchTerm) {
            navigate(`/search?q=${searchTerm}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar (Adaptar ou Remover) */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto py-4 px-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold text-gray-800">RCEI</Link>
                        <div>
                            <Link to="/login" className="mr-4 text-gray-700 hover:text-gray-900">Login</Link>
                            <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">Cadastre-se</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-green-100 py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                            Encontre, Avalie e Conecte-se com Pesquisadores
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            A plataforma completa para a comunidade científica.
                        </p>
                        <form onSubmit={handleSearch} className="max-w-lg mx-auto flex">
                            <input
                                type="text"
                                name="search"
                                placeholder="Pesquisar por nome, área de atuação, instituição..."
                                className="w-full rounded-l-md py-3 px-4 text-gray-700 focus:outline-none"
                                aria-label="Pesquisar"
                            />
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-r-md transition-colors"
                            >
                                Buscar
                            </button>
                        </form>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-xl mx-auto text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                Descubra o Poder do RCEI
                            </h2>
                            <p className="text-gray-600">
                                Ferramentas inovadoras para pesquisadores e instituições.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <FeatureCard
                                icon={<Zap size={24} />}
                                title="Busca Inteligente"
                                description="Encontre pesquisadores e publicações de forma rápida e precisa."
                            />
                            <FeatureCard
                                icon={<Users size={24} />}
                                title="Rede de Colaboração"
                                description="Conecte-se com outros pesquisadores e amplie sua rede de contatos."
                            />
                            <FeatureCard
                                icon={<Award size={24} />}
                                title="Métricas de Impacto"
                                description="Avalie o impacto de suas publicações e compare-se com seus pares."
                            />
                            <FeatureCard
                                icon={<MessageCircle size={24} />}
                                title="Interface Intuitiva"
                                description="Navegue facilmente pela plataforma e encontre as informações que você precisa."
                            />
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-xl mx-auto text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                O que a comunidade científica está dizendo
                            </h2>
                            <p className="text-gray-600">
                                Veja como o RCEI tem ajudado pesquisadores em todo o mundo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={index}
                                    content={testimonial.content}
                                    author={testimonial.author}
                                    role={testimonial.role}
                                    company={testimonial.company}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gray-100">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                            Comece a usar o RCEI agora mesmo!
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Descubra um mundo de possibilidades para sua pesquisa.
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center px-8 py-4 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold text-lg transition-colors"
                        >
                            Cadastre-se Gratuitamente
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer (Adaptar ou Remover) */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2024 RCEI. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;