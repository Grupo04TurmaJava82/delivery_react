import type Produto from "@/models/Produto";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";

interface CardProdutoProps {
	produto: Produto;
	onDelete: (id: number) => void;
	onNutriscore: () => void;
	onNutrInfo: (id: number) => void;
}

// --- Componente Principal do Card ---
export default function CardProduto({ produto, onDelete, onNutriscore, onNutrInfo }: CardProdutoProps) {
	const nutriscoreObj = identificarNutriscore(produto.nutriscore)

	return (
		<div className="
			bg-white border border-gray-200 text-gray-800
			rounded-2xl shadow-lg p-3 w-full flex flex-col
			transition-transform transform hover:scale-105 duration-300
		">
			{/* Imagem do Produto */}
			<img
				src={produto.foto}
				alt={produto.nome}
				className="w-auto h-50 object-cover rounded-lg mb-4"
				onError={(e) => {
					e.currentTarget.src = "https://i.imgur.com/gUhA04p.png";
				}}
			/>

			{/* Corpo do Card com informações */}
			<div className="flex-grow">
				<div>
					<h2 className="text-xl font-bold truncate">{produto.nome}</h2>
					<p className="text-sm text-gray-600 my-2 overflow-hidden">
						{produto.descricao}
					</p>
				</div>
				<div>
					<Label 
						className="mb-6 cursor-pointer hover:text-cinza-alt"
						onClick={() => onNutriscore()}
					>
						Nutriscore: 
						<div className={`${nutriscoreObj.bgColor} py-1 px-2 rounded`}>{nutriscoreObj.letraNutri}</div>
					</Label>
					
				</div>

				{/* Preço com a nova cor principal */}
				<p className="text-laranja-tema font-bold text-2xl mt-2">
					{produto.preco.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}
				</p>
			</div>

			{/* Ações do Card (Editar e Deletar) */}
			<div className="flex justify-end items-center my-4 gap-4 border-t border-gray-200 pt-4">
				<div className="flex justify-start items-center w-full mx-1 text-sm">
					<Label 
						className="cursor-pointer hover:text-cinza-alt"
						onClick={() => produto.id !== undefined && onNutrInfo(produto.id)}
					>
						Informações nutricionais
					</Label>
				</div>
				
				<div className="flex justify-center items-center gap-2">
					{/* Ícone de editar com a nova cor */}
					<Link
						to={`/editarproduto/${produto.id}`}
						className="text-cinza-texto hover:text-gray-500 transition-colors"
						title="Editar Produto"
					>
						<FaEdit size={20} />
					</Link>

					{/* Mantive o ícone de deletar em vermelho, pois é uma cor padrão para ações destrutivas */}
					<button
						onClick={() => produto.id !== undefined && onDelete(produto.id)}
						className="text-red-500 hover:text-red-800 transition-colors"
						title="Deletar Produto"
					>
						<FaTrash size={18} />
					</button>
				</div>
			</div>
		</div>
	);
}

//helper para atribuir Letra ao valor do nutriscore
const identificarNutriscore = (nutriscore: number | undefined) => {
	const nutriObj = {
		letraNutri: "",
		bgColor: ""
	}
	switch(nutriscore) {
		case 1:
			nutriObj.letraNutri = "A"
			nutriObj.bgColor = "bg-green-600"
			break
		case 2:
			nutriObj.letraNutri = "B"
			nutriObj.bgColor = "bg-green-400"
			break
		case 3:
			nutriObj.letraNutri = "C"
			nutriObj.bgColor = "bg-yellow-300"
			break
		case 4:
			nutriObj.letraNutri = "D"
			nutriObj.bgColor = "bg-orange-300"
			break
		case 5:
			nutriObj.letraNutri = "E"
			nutriObj.bgColor = "bg-red-400"
			break
		default:
			nutriObj.letraNutri = "N/A"
			nutriObj.bgColor = "bg-gray-400"
			break
	}
	return nutriObj
}
