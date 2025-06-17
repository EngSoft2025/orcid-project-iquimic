// pages/Homepage.tsx
import { RceiLayout } from "@/components/RceiLayout";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Homepage = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Simulação de busca de depoimentos de uma API
    const fetchTestimonials = async () => {
      // Aqui você faria uma chamada real para sua API
      const fakeTestimonials = [
        { id: 1, author: "Dr. Maria Souza", text: "O RCEI revolucionou minha pesquisa!" },
        { id: 2, author: "Prof. Carlos Silva", text: "A interface é intuitiva e o acesso à informação é rápido." },
        { id: 3, author: "Dra. Ana Pereira", text: "Recomendo o RCEI para todos os pesquisadores." },
        { id: 4, author: "João Oliveira", text: "Excelente ferramenta para encontrar publicações relevantes." },
        { id: 5, author: "Mariana Santos", text: "O RCEI facilitou a avaliação de pesquisadores." },
        { id: 6, author: "Ricardo Alves", text: "A rede de colaboração é incrível!" },
        { id: 7, author: "Fernanda Costa", text: "As métricas de citação são muito úteis." },
        { id: 8, author: "Lucas Rodrigues", text: "O RCEI é indispensável para minha pesquisa." },
        { id: 9, author: "Sofia Gomes", text: "A busca é muito eficiente." },
        { id: 10, author: "Pedro Martins", text: "A interface é moderna e fácil de usar." },
      ];

      setTestimonials(fakeTestimonials);
    };

    fetchTestimonials();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.search.value;
    if (searchTerm) {
      router.push(`/search?q=${searchTerm}`);
    }
  };

  return (
    <RceiLayout>
      <div className="space-y-8">
        {/* Banner Principal */}
        <section className="bg-indigo-600 text-white py-20 px-6 rounded-lg shadow-md">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Descubra e Avalie Pesquisadores com RCEI
            </h1>
            <p className="text-lg mb-8">
              Encontre informações detalhadas sobre pesquisadores, seus projetos e
              publicações. Avalie a qualidade e o impacto de suas contribuições.
            </p>
            <form onSubmit={handleSearch} className="flex justify-center">
              <input
                type="text"
                name="search"
                placeholder="Pesquisar pesquisadores, áreas de interesse..."
                className="w-full md:w-2/3 px-4 py-2 rounded-l-md text-gray-700 focus:outline-none"
                aria-label="Pesquisar"
              />
              <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 px-6 py-2 rounded-r-md font-semibold">
                Buscar
              </button>
            </form>
          </div>
        </section>

        {/* Seções de Destaque */}
        <section className="container mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Como Funciona o RCEI
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Encontre Pesquisadores */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Encontre Pesquisadores
              </h3>
              <p className="text-gray-600">
                Use nossa poderosa ferramenta de busca para encontrar pesquisadores
                por nome, área de atuação, instituição e muito mais.
              </p>
              <a href="/search" className="text-indigo-500 hover:text-indigo-700 mt-2 block">Explore a Busca →</a>
              <ul className="mt-4 list-disc list-inside text-sm text-gray-500">
                <li>Busca por nome</li>
                <li>Busca por área de atuação</li>
                <li>Busca por instituição</li>
                <li>Filtros avançados</li>
                <li>Resultados relevantes</li>
              </ul>
            </div>

            {/* Explore Publicações */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Explore Publicações
              </h3>
              <p className="text-gray-600">
                Acesse um vasto banco de dados de publicações acadêmicas e
                descubra os trabalhos mais relevantes em sua área de interesse.
              </p>
              <a href="/publications" className="text-indigo-500 hover:text-indigo-700 mt-2 block">Ver Publicações →</a>
              <ul className="mt-4 list-disc list-inside text-sm text-gray-500">
                <li>Milhões de artigos</li>
                <li>Busca por palavra-chave</li>
                <li>Filtros por data</li>
                <li>Download de PDFs</li>
                <li>Citações e referências</li>
              </ul>
            </div>

            {/* Avalie e Compare */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Avalie e Compare
              </h3>
              <p className="text-gray-600">
                Analise o impacto e a influência dos pesquisadores através de
                métricas de citação e outras informações relevantes.
              </p>
              <a href="/metrics" className="text-indigo-500 hover:text-indigo-700 mt-2 block">Ver Métricas →</a>
              <ul className="mt-4 list-disc list-inside text-sm text-gray-500">
                <li>Índice H</li>
                <li>Número de citações</li>
                <li>Colaborações</li>
                <li>Gráficos comparativos</li>
                <li>Análise de impacto</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="container mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            O que dizem sobre o RCEI
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-700 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-gray-500 mt-2">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recursos Adicionais */}
        <section className="container mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Recursos Adicionais
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Tutoriais */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Tutoriais
              </h3>
              <p className="text-gray-600">
                Aprenda a usar o RCEI com nossos tutoriais em vídeo e guias passo a passo.
              </p>
              <a href="/tutorials" className="text-indigo-500 hover:text-indigo-700 mt-2 block">Ver Tutoriais →</a>
            </div>

            {/* FAQ */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                FAQ
              </h3>
              <p className="text-gray-600">
                Encontre respostas para as perguntas mais frequentes sobre o RCEI.
              </p>
              <a href="/faq" className="text-indigo-500 hover:text-indigo-700 mt-2 block">Acessar FAQ →</a>
            </div>

            {/* Contato */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Contato
              </h3>
              <p className="text-gray-600">
                Entre em contato conosco para suporte técnico, sugestões e feedback.
              </p>
              <a href="/contact" className="text-indigo-500 hover:text-indigo-700 mt-2 block">Fale Conosco →</a>
            </div>
          </div>
        </section>

        {/* Chamada para Ação */}
        <section className="bg-gray-100 py-12 px-6 rounded-lg shadow-md">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Comece a Explorar o RCEI Hoje!
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Descubra um mundo de conhecimento e oportunidades na pesquisa
              acadêmica.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md">
              Experimente Grátis
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>© 2024 RCEI. Todos os direitos reservados.</p>
        </footer>
      </div>
    </RceiLayout>
  );
};

export default Homepage;