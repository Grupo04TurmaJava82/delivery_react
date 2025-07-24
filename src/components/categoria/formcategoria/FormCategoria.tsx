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
import AuthContext from "@/contexts/AuthContext/AuthContext";

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
      className="block text-sm font-bold text-gray-700 mb-2"
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
export default function FormCategorias() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // ... (toda a lógica de useState, useEffect, handleChange, etc. continua a mesma)
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado para acessar essa página.");
      navigate("/login");
    }
  }, [token, navigate]);
  
  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          await buscar(`/categoria/${id}`, setCategoria);

        } catch (error) {
          if (error.toString().includes("401")) {
            navigate('/categoria')
          }
          toast.error("Erro ao buscar dados da categoria.");
        }
      }
    }
    fetchData();
  }, [id, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const dadosParaApi = { ...categoria };
    delete dadosParaApi.id;
    try {
      if (isEditing && categoria.id) {
        dadosParaApi.id = categoria.id;
        await atualizar(`/categoria`, dadosParaApi, setCategoria);
        toast.success("Categoria atualizada com sucesso!");
      } else {
        await cadastrar(`/categoria`, dadosParaApi, setCategoria);
        toast.success("Categoria cadastrada com sucesso!");
      }
      navigate("/categorias");
    } catch (error) {
      if (error.toString().includes("401")) {
            navigate('/categoria')
          }
      toast.error(`Erro ao salvar categoria.`);
    }
  }
  const isEditing = !!id;

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-laranja-tema mb-8">
          {isEditing ? "Editar Categoria" : "Cadastrar Categoria"}
        </h2>

        <div className="gap-x-6 gap-y-4">
          {/* Coluna 1 */}
          <div className="space-y-4">
            <FormField
              label="Nome da Categoria"
              name="nome"
              value={categoria.nome}
              onChange={handleChange}
              placeholder="Ex: Bebidas"
            />
            <FormField
              label="Descrição"
              name="descricao"
              value={categoria.descricao? categoria.descricao : ""}
              onChange={handleChange}
              placeholder="Ex: Bebidas geladas e quentes"
            />
          </div>
        </div>

        <button
          type="submit"
          // Cores do botão principal atualizadas
          className="w-full mt-8 bg-laranja-tema hover:bg-laranja-escuro cursor-pointer text-white font-bold py-3 rounded-md transition-all duration-300"
        >
          {isEditing ? "Atualizar Categoria" : "Criar Categoria"}
        </button>
      </form>
    </div>
  );
}
