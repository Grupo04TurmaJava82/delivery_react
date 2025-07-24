import AuthContext from "@/contexts/AuthContext/AuthContext";
import { Star, ArrowUpRight } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { usuario } = useContext(AuthContext);
  const isLogado = usuario.token !== "";

  const IMAGES = {
    MAIN_DISH:
      "https://ik.imagekit.io/99o04eudvr/img_getfood/teste?updatedAt=1752108584071",
    CUSTOMER_AVATAR_1:
      "https://ik.imagekit.io/99o04eudvr/img_getfood/pessoa1.png",
    CUSTOMER_AVATAR_2:
      "https://ik.imagekit.io/99o04eudvr/img_getfood/pessoa2.png",
    CUSTOMER_AVATAR_3:
      "https://ik.imagekit.io/99o04eudvr/img_getfood/pessoa3.png",
    CHEF_AVATAR: "https://ik.imagekit.io/99o04eudvr/img_getfood/chef.png",
    PRODUCT_IMAGE: "https://ik.imagekit.io/99o04eudvr/img_getfood/pizza.png",
    SERVICE_IMAGE_1:
      "https://ik.imagekit.io/99o04eudvr/img_getfood/serv1(1).png?updatedAt=1752172164641",
    SERVICE_IMAGE_2:
      "https://ik.imagekit.io/99o04eudvr/img_getfood/serv2.png?updatedAt=1752172518380",
    SERVICE_IMAGE_3:
      "https://ik.imagekit.io/99o04eudvr/img_getfood/serv3(1).png?updatedAt=1752172668612",
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* LADO ESQUERDO */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="bg-orange-100 text-laranja-tema text-sm font-semibold py-1 px-3 rounded-full inline-flex items-center gap-1">
              Mais que Rápido
              <ArrowUpRight className="w-4 h-4" />
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Garanta a <span className="text-laranja-tema">Melhor Oferta</span> em
              Fast Food & <span className="text-laranja-tema">Restaurantes</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
              Nosso trabalho é encher sua barriga com comida deliciosa, com
              entrega rápida e gratuita.
            </p>

            {!isLogado && (
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
                <Link to="/cadastro">
                  <button className="bg-laranja-tema hover:bg-laranja-escuro text-white font-bold text-base px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    Começar Agora
                  </button>
                </Link>
              </div>
            )}

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-6">
              <div className="flex -space-x-2">
                <img
                  src={IMAGES.CUSTOMER_AVATAR_1}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="Cliente 1"
                />
                <img
                  src={IMAGES.CUSTOMER_AVATAR_2}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="Cliente 2"
                />
                <img
                  src={IMAGES.CUSTOMER_AVATAR_3}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="Cliente 3"
                />
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  Nossos Clientes Satisfeitos
                </p>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <p className="text-sm font-semibold text-gray-800">
                    4.8{" "}
                    <span className="font-normal text-gray-500">
                      (12.5k Avaliações)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="relative flex justify-center items-center">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-400 p-3 rounded-full shadow-lg z-20">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div className="w-[350px] h-[350px] md:w-[420px] md:h-[420px] rounded-full bg-gray-100 shadow-2xl flex items-center justify-center z-10">
              <img
                src={IMAGES.MAIN_DISH}
                alt="Prato principal"
                className="object-cover w-full h-full scale-110"
              />
            </div>

            <div className="absolute top-28 -left-5 bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 z-20 w-48">
              <img
                src={IMAGES.CHEF_AVATAR}
                className="w-10 h-10 rounded-full object-cover"
                alt="Entregador"
              />
              <div>
                <p className="text-sm font-bold text-gray-800">Carlos Silva</p>
                <p className="text-xs text-gray-500">Entregador</p>
              </div>
              <div className="absolute bottom-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white" />
            </div>

            <div className="absolute -bottom-8 right-0 bg-white p-3 rounded-xl shadow-lg flex items-start gap-3 z-20 w-52">
              <img
                src={IMAGES.PRODUCT_IMAGE}
                className="w-16 h-16 rounded-xl object-cover"
                alt="Pizza Italiana"
              />
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Pizza Italiana
                </p>
                <div className="flex items-center text-yellow-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-base font-bold text-gray-900 mt-1">
                  <span className="text-sm mr-1">R$</span>39,90
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE SERVIÇOS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[#ff5d00] text-base font-semibold tracking-wider uppercase mb-2">
            O que servimos
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Seu Parceiro Favorito de <br /> Entrega de Comida
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                image: IMAGES.SERVICE_IMAGE_1,
                title: "Fácil de Pedir",
                desc: "Você só precisa de alguns passos para pedir sua comida.",
              },
              {
                image: IMAGES.SERVICE_IMAGE_2,
                title: "Entrega Mais Rápida",
                desc: "Entrega sempre no horário, e muitas vezes até mais rápido.",
              },
              {
                image: IMAGES.SERVICE_IMAGE_3,
                title: "Alta Qualidade",
                desc: "Não é só velocidade, para nós a qualidade também é número um.",
              },
            ].map((service, idx) => (
              <div key={idx} className="text-center space-y-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="mx-auto w-80 h-40 object-contain"
                />
                <h3 className="text-2xl font-bold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 max-w-xs mx-auto">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
