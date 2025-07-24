import { type MouseEventHandler } from "react"
import { FaShoppingBag, FaSignInAlt } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"
import { Link, NavLink } from "react-router-dom"

const SideMenu = ({ isLogado, isMenuAtivo, handleMenuClick, logout }: { isLogado: boolean, isMenuAtivo:boolean, handleMenuClick:MouseEventHandler, logout:MouseEventHandler  }) => {
    return <aside className={`
        fixed top-0 right-0 z-40
        w-70 h-screen
        bg-white shadow-lg rounded-l-2xl
        ${isMenuAtivo ? "-translate-x-0" : "translate-x-full"} 
        transition-transform duration-300
        `}>
        <div className="m-6 mx-7 font-medium">
            <h2 className="text-xl font-bold text-cinza-texto">Menu</h2>
            {/* Páginas */}
            <ul className="flex flex-col gap-3 pt-5">
            <li><MenuLink to="/sobre" onClick={handleMenuClick}>Por que GetFood?</MenuLink></li>
            {isLogado ? <li><MenuLink to="/produtos" onClick={handleMenuClick}>Cardápio</MenuLink></li> : ""}
            {isLogado ? <li><MenuLink to="/categorias" onClick={handleMenuClick}>Categorias</MenuLink></li> : ""}
            <li><MenuLink to="/equipe" onClick={handleMenuClick}>Contato</MenuLink></li>
            </ul>

            {isLogado ? (
            <div className="
                flex flex-col gap-3
                mt-6 mb-4
            ">
                <button className="text-cinza-texto hover:text-laranja-tema transition text-md cursor-pointer flex items-center gap-1">
                <FiSearch/> Buscar
                </button>
                <button className="text-cinza-texto hover:text-laranja-tema transition text-md cursor-pointer flex items-center gap-1">
                <FaShoppingBag /> Carrinho
                </button>
            </div>
            ) : ""}
            {/* Botão de autenticação */}
            <BotaoAuth isLogado={isLogado} logout={logout} className="w-fit mt-5" />
        </div>
        </aside>
}


const MenuLink = ({ to, children, onClick }: 
{ to: string, children: React.ReactNode, onClick?: MouseEventHandler}) => {
  return <>
    <NavLink
      to={to} onClick={onClick} className={({ isActive }) =>`
        ${isActive && "text-laranja-tema bg-orange-100 px-3 py-2.5 rounded-md"}
        hover:opacity-90 transition
        hover:text-laranja-escuro
      `}>
      {children}
    </NavLink>
  </>
}

const BotaoAuth = ({ isLogado, logout, className }: 
{ isLogado: boolean, logout:MouseEventHandler, className?:string }) => {
  if(!isLogado) {
    return <Link
      to="/login"
      className={`
        bg-laranja-tema hover:bg-laranja-escuro text-white flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium transition
        ${className}
    `}>
      <FaSignInAlt /> Login
    </Link>
  } else {
    return <Link
      to="/home"
      onClick={logout}
      className={`
        bg-laranja-tema hover:bg-laranja-escuro text-white flex items-center gap-1 px-4 py-2 rounded-md text-base font-medium transition
        ${className}
    `}>
      <FaSignInAlt /> Sair
    </Link>
  }
}

export default SideMenu