// src/components/produtos/ProdutoForm.tsx

import {
	useState,
	useEffect,
	type FormEvent,
	type ChangeEvent,
	useContext,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { atualizar, buscar, cadastrar } from "@/services/Service"; // Verifique o caminho se necessário
import type Categoria from "@/models/Categoria";
import type Produto from "@/models/Produto";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import "@/utils/glass.css"

// --- Interfaces e Componente Auxiliar (sem mudanças) ---
interface FormFieldProps {
	label: string;
	name: string;
	type?: "text" | "number";
	value: string | number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	required?: boolean;
}

const FormField = ({
	label,
	name,
	type = "text",
	value,
	onChange,
	placeholder,
	required = true,
}: FormFieldProps) => (
	<div>
		<label
			htmlFor={name}
			className="block text-sm font-bold text-cinza-texto mb-2"
		>
			{label}
		</label>
		<input
			id={name}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			required={required}
			// Cor do anel de foco atualizada
			className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e54300]"
			step={type === "number" ? "0.01" : undefined}
		/>
	</div>
);

// --- Componente Principal do Formulário ---
export default function ProdutoForm() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { usuario } = useContext(AuthContext);

	// ... (toda a lógica de useState, useEffect, handleChange, etc. continua a mesma)
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [produto, setProduto] = useState<Produto>({} as Produto);
	const token = usuario.token;

	useEffect(() => {
		if (token === "") {
			alert("Você precisa estar logado para acessar essa página.");
			navigate("/login");
		}
	}, [token, navigate]);
	
	useEffect(() => {
		async function fetchData() {
			try {
				await buscar("/categoria", setCategorias);
			} catch (error) {
				if (error.toString().includes("401")) {
					navigate("/produtos");
				}
				toast.error("Erro ao buscar categorias.");
			}
			if (id) {
				try {
					await buscar(`/produtos/${id}`, setProduto);
				} catch (error) {
					if (error.toString().includes("401")) {
						navigate("/produtos");
					}
					toast.error("Erro ao buscar dados do produto.");
				}
			}
		}
		fetchData();
	}, [id, navigate]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const numericFields = [
			"preco",
			"calorias",
			"nutriscore",
			"energia",
			"acucares",
			"gordurasSaturadas",
			"sodio",
			"frutas",
			"fibras",
			"proteinas",
		];
		setProduto((prev) => ({
			...prev,
			[name]: numericFields.includes(name) ? parseFloat(value) || 0 : value,
		}));
	};
	const handleCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const categoriaId = parseInt(e.target.value, 10);
		const categoriaSelecionada = categorias.find((c) => c.id === categoriaId);
		if (categoriaSelecionada) {
			setProduto((prev) => ({ ...prev, categoria: categoriaSelecionada }));
		}
	};

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (!produto.categoria) {
			toast.error("Por favor, selecione uma categoria.");
			return;
		}
		const dadosParaApi = { ...produto };
		delete dadosParaApi.id;
		dadosParaApi.calorias = Math.round(dadosParaApi.energia * 0.239006);
		try {
			if (isEditing && produto.id) {
       			dadosParaApi.id = produto.id;
				await atualizar(`/produtos`, dadosParaApi, setProduto);
				toast.success("Produto atualizado com sucesso!");
			} else {
				await cadastrar(`/produtos`, dadosParaApi, setProduto);
				toast.success("Produto cadastrado com sucesso!");
			}
			navigate("/produtos");
		} catch (error) {
      		if (error.toString().includes("401")) {
				navigate('/produtos')
			}
			toast.error(`Erro ao salvar produto.`);
		}
	}
	const isEditing = !!id;

	return (
		<div className="flex justify-center items-center h-full p-4 bg-gray-100">
			<form
				onSubmit={handleSubmit}
				className="glass p-8 rounded-2xl shadow-lg w-full max-w-2xl my-2"
			>
				<h2 className="text-3xl font-bold text-center text-laranja-tema mb-8">
					{isEditing ? "Editar Produto" : "Cadastrar Produto"}
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
					{/* Coluna 1 */}
					<div className="space-y-4">
						<FormField
							label="Nome do Produto"
							name="nome"
							value={produto.nome}
							onChange={handleChange}
							placeholder="Ex: Hambúrguer de Picanha"
						/>
						<FormField
							label="Descrição"
							name="descricao"
							value={produto.descricao? produto.descricao : ""}
							onChange={handleChange}
							placeholder="Pão, hambúrguer 200g, queijo..."
						/>
						<FormField
							label="URL da Foto"
							name="foto"
							value={produto.foto? produto.foto : ""}
							onChange={handleChange}
							placeholder="https://exemplo.com/foto.png"
						/>

						<div>
							<label
								htmlFor="categoria"
								className="block text-sm font-bold text-cinza-texto mb-2"
							>
								Categoria
							</label>
							<select
								id="categoria"
								name="categoria"
								// Cor do anel de foco atualizada
								className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-laranja-tema"
								value={produto.categoria?.id || ""}
								onChange={handleCategoriaChange}
								required
							>
								<option value="" disabled>
									Selecione uma categoria
								</option>
								{categorias.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.nome}
									</option>
								))}
							</select>
						</div>

						<FormField
							label="Preço (R$)"
							name="preco"
							type="number"
							value={produto.preco}
							onChange={handleChange}
							placeholder="Ex: 29.90"
						/>
					</div>

					{/* Coluna 2 - Informações Nutricionais */}
					<div className="space-y-4">
						<FormField
							label="Energia (kJ)"
							name="energia"
							type="number"
							value={produto.energia}
							onChange={handleChange}
							placeholder="Ex: 2300"
							required={false}
						/>
						<FormField
							label="Açúcares (g)"
							name="acucares"
							type="number"
							value={produto.acucares}
							onChange={handleChange}
							placeholder="Ex: 5.5"
							required={false}
						/>
						<FormField
							label="Gorduras Saturadas (g)"
							name="gordurasSaturadas"
							type="number"
							value={produto.gordurasSaturadas}
							onChange={handleChange}
							placeholder="Ex: 12"
							required={false}
						/>
						<FormField
							label="Sódio (mg)"
							name="sodio"
							type="number"
							value={produto.sodio}
							onChange={handleChange}
							placeholder="Ex: 1.5"
							required={false}
						/>
						<FormField
							label="Frutas (%)"
							name="frutas"
							type="number"
							value={produto.frutas}
							onChange={handleChange}
							placeholder="Ex: 0"
							required={false}
						/>
						<FormField
							label="Fibras (g)"
							name="fibras"
							type="number"
							value={produto.fibras}
							onChange={handleChange}
							placeholder="Ex: 3.2"
							required={false}
						/>
						<FormField
							label="Proteínas (g)"
							name="proteinas"
							type="number"
							value={produto.proteinas}
							onChange={handleChange}
							placeholder="Ex: 25"
							required={false}
						/>
					</div>
				</div>

				<button
					type="submit"
					// Cores do botão principal atualizadas
					className="w-full mt-8 bg-laranja-tema hover:bg-laranja-escuro cursor-pointer text-white font-bold py-3 rounded-md transition-all duration-300"
				>
					{isEditing ? "Atualizar Produto" : "Criar Produto"}
				</button>
			</form>
		</div>
	);
}
