import CardProduto from "@/components/produtos/CardProduto";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import type Produto from "@/models/Produto";
import { buscar, deletar } from "@/services/Service";
import { ToastAlerta } from "@/utils/ToastAlerta";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify"; // Verifique o caminho se necessário
import Swal from "sweetalert2";

function ListaProdutos() {
    const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [produtos, setProdutos] = useState<Produto[]>([]);
	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	// ... (lógica de fetchProdutos e useEffect continua a mesma)
	async function fetchProdutos() {
		setIsLoading(true)
		try {
			await buscar("/produtos", setProdutos);
		} catch (error) {
			if (typeof error === 'string' && error.toString().includes("401")) {
				toast.error("Erro ao buscar produtos.");
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchProdutos();
	}, [handleLogout, token]);

	useEffect(() => {
		if (token === "") {
			navigate("/home");
			ToastAlerta("Você precisa estar logado para acessar essa página.", "info");
		}
	}, [navigate, token]);

    // Função para deletar um produto com SweetAlert2 e novas cores
	async function handleDelete(id: number) {
		Swal.fire({
			title: "Você tem certeza?",
			text: "Esta ação não poderá ser desfeita!",
			icon: "warning",
			showCancelButton: true,
			// Cores dos botões do alerta atualizadas
			confirmButtonColor: "#e54300",
			cancelButtonColor: "#6e7881",
			confirmButtonText: "Sim, apagar!",
			cancelButtonText: "Cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await deletar(`/produtos/${id}`);
					toast.success("Produto apagado com sucesso!");
					fetchProdutos();
				} catch (error) {
					if(typeof error === 'string')
						toast.error("Erro: " + error.toString());
				}
			}
		});
	}

	const handleNutriscore = async () => {
		Swal.fire({
			title: "O que é nutriscore?",
			icon: "question",
			iconColor: "#ff5d00",
			html: `
				<p class="text-justify text-lg w-[90%] justify-center mx-auto">
					O NutriScore é um sistema de rotulagem nutricional criado para ajudar os consumidores 
					a fazerem escolhas alimentares mais saudáveis de forma rápida e simples. Ele utiliza uma escala 
					de cores que vai do verde (letra A) ao vermelho (letra E), indicando o perfil nutricional de um 
					alimento. A classificação leva em conta a quantidade de nutrientes considerados positivos (como fibras, proteínas,
					frutas e vegetais) e negativos (como açúcares, gorduras saturadas e sal). Quanto mais saudável o alimento,
					mais próximo da letra A ele estará.
				</p>
			`,
			focusConfirm: false,
			confirmButtonText: "Entendi!",
			confirmButtonAriaLabel: "Confirmar",
			customClass: {
				confirmButton: "bg-laranja-tema hover:bg-laranja-escuro text-white font-medium py-2 px-4 rounded",
			},
			buttonsStyling: false
		});
	}

	const handleNutriInfo = async (id: number) => {
		const produtoSelecionado = produtos.find((produtoAtual) => produtoAtual.id === id)

		Swal.fire({
			title: "Informações nutricionais",
			icon: "info",
			iconColor: "#ff5d00",
			html: `
				<div class="text-center text-lg w-[90%] justify-center mx-auto">
					<p>Energia (kJ): ${produtoSelecionado?.energia}</p>
					
					<p>Açúcares (g): ${produtoSelecionado?.acucares}</p>
					<p>Gorduras Saturadas (g): ${produtoSelecionado?.gordurasSaturadas}</p>
					<p>Sódio (mg): ${produtoSelecionado?.sodio}</p>
					<p>Frutas (%): ${produtoSelecionado?.frutas}</p>
					<p>Fibras (g): ${produtoSelecionado?.fibras}</p>
					<p>Proteínas (g): ${produtoSelecionado?.proteinas}</p>
				</div>
			`,
			focusConfirm: false,
			confirmButtonText: "Entendi!",
			confirmButtonAriaLabel: "Confirmar",
			customClass: {
				confirmButton: "bg-laranja-tema hover:bg-laranja-escuro text-white font-medium py-2 px-4 rounded",
			},
			buttonsStyling: false
		});
	}

    return (
        <div className="flex my-8">
            <div className="container flex flex-col justify-start mx-2 items-center w-full">
                {isLoading && (
                    <div className="flex justify-center items-center w-full h-full">
                        <ClipLoader size={100} color="#e54300"/>
                    </div>
                )}

                {produtos.length === 0 && !isLoading ? (
                    <p className="text-center text-gray-500 mt-16">
                        Nenhum produto encontrado...
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full">
                        {produtos.map((produto) => (
                            <CardProduto
                                key={produto.id}
                                produto={produto}
                                onDelete={handleDelete}
								onNutriscore={handleNutriscore}
                                onNutrInfo={handleNutriInfo}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListaProdutos;


