import { useNavigate } from "react-router-dom";
import CardCategoria from "../cardcategoria/CardCategoria";
import { useContext, useEffect, useState } from "react";
import type Categoria from "@/models/Categoria";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import { buscar } from "@/services/Service";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function ListaCategoria() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function fetchCategorias() {
    setIsLoading(true);
    try {
      await buscar("/categoria", setCategorias);
    } catch (error) {
      if (typeof error === 'string' && error.toString().includes("401")) {
        toast.error("Erro ao buscar categorias.");	
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token === "") {
      navigate("/home");
      toast.info("Você precisa estar logado para acessar essa página.");
    }
  }, [navigate, token]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="flex my-8">
      <div className="container flex flex-col mx-2 justify-center items-center">
        {isLoading && (
          <div className="flex justify-center items-center w-full h-full">
            <ClipLoader size={100} color="#e54300"/>
          </div>
        )}

        {!isLoading && categorias.length === 0 && (
          <span className="text-center text-gray-500 mt-16">
            Nenhuma categoria foi encontrada!
          </span>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-2 
                lg:grid-cols-3 gap-8 w-full"
        >
          {categorias.map((categoria) => (
            <CardCategoria key={categoria.id} categoria={categoria} fetchApi={fetchCategorias} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListaCategoria;
