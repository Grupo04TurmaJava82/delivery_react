import React, { type JSX } from "react";
import { Link } from "react-router-dom"; // Usando Link para navegação interna
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  // Componente auxiliar para os títulos das colunas para evitar repetição
  const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-lg font-bold text-cinza-texto mb-4">{title}</h3>
  );

  // Componente auxiliar para os links do rodapé
  const FooterLink = ({ to, children }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <li>
      <Link
        to={to}
        className="text-cinza-alt hover:text-laranja-tema transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );

  return (
    <footer className="
      bg-white
      shadow-2xl/60 rounded-t-3xl
      px-6 py-8
    ">
      {/* Grid principal que se adapta para telas menores */}
      <div className="grid grid-cols-[1.3fr_1fr] md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Coluna 1: Logo e Social */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold">
            <span className="text-cinza-texto">Get</span>
            <span className="text-laranja-tema">Food</span>
          </h2>
          <p className="text-cinza-alt mt-4 max-w-md">
            Nossa missão é encher sua barriga com comida deliciosa e entrega
            rápida.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinza-alt hover:text-laranja-tema transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinza-alt hover:text-laranja-tema transition-colors"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cinza-alt hover:text-laranja-tema transition-colors"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Coluna 2: Sobre */}
        <div >
          <SectionTitle title="Sobre" />
          <ul className="space-y-3">
            <FooterLink to="/sobre">Sobre Nós</FooterLink>
            <FooterLink to="/servicos">Serviços</FooterLink>
            <FooterLink to="/novidades">Novidades</FooterLink>
            <FooterLink to="/cardapio">Cardápio</FooterLink>
          </ul>
        </div>

        {/* Coluna 3: Empresa */}
        <div>
          <SectionTitle title="Empresa" />
          <ul className="space-y-3">
            <FooterLink to="/porque">Por que GetFood?</FooterLink>
            <FooterLink to="/parceiros">Seja um Parceiro</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
          </ul>
        </div>

        {/* Coluna 4: Suporte e Contato */}
        <div className="">
          <SectionTitle title="Suporte" />
          <ul className="space-y-3">
            <FooterLink to="/conta">Minha Conta</FooterLink>
            <FooterLink to="/central-ajuda">Central de Ajuda</FooterLink>
            <FooterLink to="/feedback">Feedback</FooterLink>
            <FooterLink to="/contato">Contato</FooterLink>
          </ul>
        </div>
      </div>

      {/* Linha do Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-cinza-texto text-sm">
          Copyright &copy; {currentYear} GetFood. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

// Removi a coluna "Get in Touch" com o formulário para simplificar e focar nas colunas de links,
// que são mais comuns. Se você realmente quiser o formulário, posso adicioná-lo!
// A coluna "Suporte" já inclui um link para "Contato", que levaria a uma página com formulário.

export default Footer;
