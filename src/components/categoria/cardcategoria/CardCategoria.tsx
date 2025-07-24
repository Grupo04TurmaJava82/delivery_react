import type Categoria from "@/models/Categoria";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { TrashSimple } from "@phosphor-icons/react";
import { PencilSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { ToastAlerta } from "@/utils/ToastAlerta";
import { useContext, useState } from "react";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import { deletar } from "@/services/Service";
import Swal from "sweetalert2";

interface CardCategoriaProps {
  categoria: Categoria;
  fetchApi: () => void;
}

export default function CardCategoria({ categoria, fetchApi }: CardCategoriaProps) {
  const { handleLogout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

    async function handleDelete() {
      Swal.fire({
        title: "Você tem certeza?",
        text: "Esta ação não poderá ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        // Cores dos botões do alerta atualizadas
        confirmButtonColor: "#fa2d37",
        cancelButtonColor: "#6e7881",
        confirmButtonText: "Sim, apagar!",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await excluirCategoria();
        }
      });
    }

  async function excluirCategoria() {
    setIsLoading(true);
    try {
      await deletar(`/categoria/${categoria.id}`);
      fetchApi();

      ToastAlerta("Categoria excluída com sucesso!", "sucesso");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes("401") || msg.includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao excluir a categoria!", "erro");
      }
    }
    setIsLoading(false);
  }

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex">
        <CardTitle>{categoria.nome}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="flex text-left gap-2">
          <span className="font-bold">Descrição: </span>
          {categoria.descricao}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Link to={`/editarcategorias/${categoria.id}`}>
          <Button className="bg-green-600 hover:bg-green-700 text-white flex gap-1 items-center">
            <PencilSimple size={20} />
            Editar
          </Button>
        </Link>

            <Button
              onClick={() => {
                if (typeof categoria.id === "number") {
                  handleDelete();
                } else {
                  ToastAlerta("ID da categoria inválido!", "erro");
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white flex gap-1 items-center"
            >
              <TrashSimple size={20} />
              Excluir
            </Button>

      </CardFooter>
    </Card>
  );
}
