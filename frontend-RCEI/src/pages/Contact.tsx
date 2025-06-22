import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulando o envio do formulário
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Fale Conosco</h1>
          <p className="text-lg mb-8">Tem alguma dúvida, sugestão ou comentário? Estamos aqui para ouvir você!</p>
        </div>
      </header>

      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Outras formas de contato - Cards ao lado do formulário */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
                <MapPin size={40} className="text-green-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Endereço</h3>
                  <p className="text-gray-600">ICMC - USP, Av. Trabalhador São-carlense, 400, Centro, São Carlos - SP, 13566-590</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
                <Mail size={40} className="text-green-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">E-mail</h3>
                  <a href="mailto:suporte@rcei.com.br" className="text-gray-600 hover:text-green-500">suporte@rcei.com.br</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
                <Phone size={40} className="text-green-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Telefone</h3>
                  <a href="tel:+551633739700" className="text-gray-600 hover:text-green-500">(16) 3373-9700</a>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Conecte-se conosco:</h3>
                <div className="flex justify-center space-x-6">
                  <Link to="https://facebook.com" target="_blank" className="text-gray-600 hover:text-blue-600">
                    <Facebook size={28} />
                  </Link>
                  <Link to="https://twitter.com" target="_blank" className="text-gray-600 hover:text-blue-400">
                    <Twitter size={28} />
                  </Link>
                  <Link to="https://instagram.com" target="_blank" className="text-gray-600 hover:text-pink-600">
                    <Instagram size={28} />
                  </Link>
                  <Link to="https://linkedin.com" target="_blank" className="text-gray-600 hover:text-blue-700">
                    <Linkedin size={28} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Formulário de contato */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              {submitSuccess ? (
                <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
                  <p className="text-green-600 text-xl font-semibold">Sua mensagem foi enviada com sucesso!</p>
                  <p className="text-gray-600 mt-4">Obrigado por entrar em contato, nossa equipe responderá em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 font-semibold">Nome</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-semibold">Mensagem</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 RCEI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
