import { NavLink, Link } from "react-router-dom";
import { FaShoppingBag, FaSignInAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import logo from "@/assets/logo_site.png";
import { IoMenu } from "react-icons/io5";
import { useCart } from "@/contexts/CartContext/useCart";
import "@/utils/glass.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import { ToastAlerta } from "@/utils/ToastAlerta";
import SideMenu from "../sidemenu/SideMenu";

export default function Navbar() {
  const { cartItemCount } = useCart();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [isLogado, setIsLogado] = useState(false);
  const [isMenuAtivo, setIsMenuAtivo] = useState(false)

  useEffect(() => {
    if (usuario.token !== "") {
      setIsLogado(true);
    } else {
      setIsLogado(false)
    }
  }, [usuario]);

  const logout = () => {
    try {
      handleLogout();
      handleMenuClick();
      ToastAlerta("Logout realizado. Até mais!", "sucesso");
    } catch (error) {
      ToastAlerta("Erro ao fazer o logout", "erro");
      console.log(error);
    }
  };

  const handleMenuClick = () => {
    setIsMenuAtivo(!isMenuAtivo)
  }

  return (
    <>
      <nav className="
        w-full h-25 md:px-15 px-5
        flex items-center justify-between 
        text-lg glass
      ">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="GetFood-Logo" className="size-14 w-auto" />
        </Link>

        {/* Menu */}
        <div className="
          justify-center md:gap-3 items-center font-medium
          hidden lg:flex md:px-5
        ">
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              `${isActive && "text-laranja-tema"}
              hover:opacity-90 transition
              hover:text-laranja-escuro w-max`
            }
          >
            Por que GetFood?
          </NavLink>

          {isLogado && (
            <>
              <NavLink
                to="/produtos"
                className={({ isActive }) =>
                  `${isActive && "text-laranja-tema"}
                  hover:opacity-90 transition
                  hover:text-laranja-escuro`
                }
              >
                Cardápio
              </NavLink>

              <NavLink
                to="/categorias"
                className={({ isActive }) =>
                  `${isActive && "text-laranja-tema"}
                  hover:opacity-90 transition
                  hover:text-laranja-escuro`
                }
              >
                Categorias
              </NavLink>
            </>
          )}

          <NavLink
            to="/equipe"
            className={({ isActive }) =>
              `${isActive && "text-laranja-tema"}
              hover:opacity-90 transition
              hover:text-laranja-escuro`
            }
          >
            Contato
          </NavLink>
        </div>

        {/* Ações à direita */}
        <div className="
          hidden lg:flex
          items-center gap-5 justify-end
        ">
          {isLogado && (
            <>
              <button className="text-cinza-texto hover:text-laranja-tema transition text-lg">
                <FiSearch className="cursor-pointer" />
              </button>

              <div className="relative">
                <FaShoppingBag className="text-xl hover:text-laranja-tema transition cursor-pointer" />
                {cartItemCount > 0 && (
                  <span
                    className="
                    absolute -top-2 -right-2 bg-laranja-tema text-white text-lg w-5 h-5 flex items-center justify-center rounded-full
                  "
                  >
                    {cartItemCount}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Botão de login */}
          {!isLogado ? (
            <Link
              to="/login"
              className="bg-laranja-tema hover:bg-laranja-escuro text-white flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium transition"
            >
              <FaSignInAlt /> Login
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={logout}
              className="bg-laranja-tema hover:bg-laranja-escuro text-white flex items-center gap-1 px-4 py-2 rounded-full text-base font-medium transition"
            >
              <FaSignInAlt /> Sair
            </Link>
          )}
        </div>
        {/* Botão de menu lateral */}
        <div className="lg:hidden">
          <div className="font-medium cursor-pointer" onClick={handleMenuClick}>
            <IoMenu size={40} className="
              text-laranja-tema hover:text-laranja-escuro transition
            "/>
          </div>
          
        </div>
      </nav>
      {/* Camada que ofusca o fundo */}
      <div className={`
        fixed inset-0 bg-black/30 backdrop-blur-sm z-30
        ${!isMenuAtivo ? "opacity-0 pointer-events-none " : ""} 
        transition-all duration-300
      `}
        onClick={handleMenuClick}
      />
      {/* Menu Lateral */}
      <SideMenu 
        isLogado={isLogado}
        isMenuAtivo={isMenuAtivo}
        handleMenuClick={handleMenuClick}
        logout={logout}
      />
    </>
  );
}
