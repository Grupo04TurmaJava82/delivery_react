import ListaProdutos from "@/components/produtos/ListaProdutos";
import { PlusIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function ProdutosPage() {
	return (
		<div className="mx-auto py-12 px-4 w-screen">
			<div className="container flex justify-between px-4">
				<h1 className="text-4xl font-bold text-gray-800">Produtos</h1>
				<Link
					to="/novoproduto"
					className="
						bg-laranja-tema hover:bg-laranja-escuro
						text-white font-bold py-2 px-4 rounded-md 
						transition-colors
						flex items-center gap-2
				">
					<PlusIcon size={20} color="#fafafa" />
					Novo Produto
				</Link>
			</div>
			<ListaProdutos />
		</div>
	);
	
}
