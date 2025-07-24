import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800 py-16 px-6">
      <div className="mx-auto">
        {/* Título */}
        <h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-laranja-tema"
        >
          Sobre o Projeto
        </h1>

        {/* Parágrafo introdutório */}
        <p className="text-lg md:text-xl text-center text-cinza-texto mb-12 leading-relaxed max-w-3xl mx-auto">
          O <span className="font-semibold text-laranja-tema">GetFood </span>
          é uma aplicação moderna desenvolvida com foco em experiência do usuário, agilidade e segurança nas entregas urbanas. Ideal para restaurantes, mercados e pequenos comércios que desejam entregar com eficiência.
        </p>

        {/* Seção de características */}
        <div className="grid md:grid-cols-2 gap-10">
          <FeatureCard
            title="Tecnologia Moderna"
            description="Construído com React, TypeScript e Tailwind CSS, garantindo performance e facilidade de manutenção."
          />
          <FeatureCard
            title="Interface Intuitiva"
            description="Pensada para facilitar o uso tanto por entregadores quanto por clientes, com usabilidade fluida."
          />
          <FeatureCard
            title="Entrega Rápida"
            description="Algoritmo inteligente de roteamento para reduzir tempo de espera e melhorar a eficiência das entregas."
          />
          <FeatureCard
            title="Painel Administrativo"
            description="Gerencie pedidos, status de entregas e cadastros com um painel completo e responsivo."
          />
        </div>

        {/* CTA final */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-laranja-tema">
            Vamos revolucionar a forma como você entrega!
          </h2>
          <p className="text-cinza-texto text-lg mb-6">
            Junte-se ao GetFood Delivery e proporcione uma nova experiência aos seus clientes.
          </p>
          <Link to="/cadastro" className="text-white font-semibold">
            <button className="bg-laranja-tema px-6 py-3 rounded-full hover:bg-laranja-escuro transition-colors shadow-lg cursor-pointer">
              Comece Agora
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Componente de Feature
interface FeatureProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureProps) {
  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
      <h3 className="text-xl font-semibold mb-2 text-laranja-tema">{title}</h3>
      <p className="text-cinza-texto">{description}</p>
    </div>
  );
}
