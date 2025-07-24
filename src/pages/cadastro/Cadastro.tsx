import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationError } from "yup";
import "@/utils/glass.css";

import { cadastrarUsuario } from "@/services/Service";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAlerta } from "@/utils/ToastAlerta";
import { Button } from "@/components/ui/button";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  fullCadastroSchema,
  type FormDataType,
} from "@/utils/ValidacaoEtapas";

const STEPS = [
  {
    id: 1,
    title: "Dados Pessoais",
    fields: ["nome", "dataNascimento"],
    schema: step1Schema,
  },
  {
    id: 2,
    title: "Contato",
    fields: ["usuario", "telefone"],
    schema: step2Schema,
  },
  {
    id: 3,
    title: "Segurança",
    fields: ["senha", "confirmaSenha"],
    schema: step3Schema,
  },
  {
    id: 4,
    title: "Finalizar",
    fields: ["foto", "tipo", "aceitaTermos"],
    schema: step4Schema,
  },
];

const inputClass =
  "w-full px-2 py-1 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200";
const errorClass = "text-xs text-red-600 mt-1";

function CadastroNovo() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormDataType>({ 
    resolver: yupResolver(fullCadastroSchema),
    mode: "onBlur",
    defaultValues: {
      nome: "",
      usuario: "",
      senha: "",
      dataNascimento: new Date(0),
      foto: "",
      telefone: "",
      tipo: 0,
      confirmaSenha: "",
      aceitaTermos: false,
    },
  });

  const watchedAceitaTermos = watch("aceitaTermos");

  const handleNext = async () => {
    const fieldsToValidate = STEPS[currentStep - 1]
      .fields as (keyof FormDataType)[];
    setIsLoading(true);
    try {
      const isValidStep = await trigger(fieldsToValidate);
      if (isValidStep) {
        setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      } else {
        Object.values(errors).forEach((error) => {
          if (error?.message) ToastAlerta(error.message, "erro");
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleCadastrar = async (data: FormDataType) => {
    setIsLoading(true);

    try {
      // Cria um novo objeto sem confirmaSenha e aceitaTermos
      const usuarioToSend = {
        nome: data.nome,
        usuario: data.usuario,
        senha: data.senha,
        dataNascimento: data.dataNascimento,
        foto: data.foto,
        telefone: data.telefone,
        tipo: data.tipo,
      };

      await cadastrarUsuario("/usuarios/cadastrar", usuarioToSend, () => {});
      ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      navigate("/login");
    } catch (error: unknown) {
      console.error("Erro ao cadastrar usuário:", error);

      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          if (err.message) ToastAlerta(err.message, "erro");
        });
      } else {
        const mensagem =
          error instanceof Error ? error.message : "Erro desconhecido";
        ToastAlerta(`Erro ao cadastrar usuário: ${mensagem}`, "erro");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-3">
            <div>
              <Label
                htmlFor="nome"
                className="block text-sm font-medium text-cinza-texto mb-1"
              >
                Nome Completo *
              </Label>
              <Input
                id="nome"
                placeholder="Seu nome completo"
                {...register("nome")}
                className={`${inputClass} ${
                  errors.nome ? "border-red-500" : ""
                }`}
                aria-invalid={errors.nome ? "true" : "false"}
              />
              {errors.nome && (
                <p className={errorClass}>{errors.nome.message}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="dataNascimento"
                className="block text-sm font-medium text-cinza-texto mb-1"
              >
                Data de Nascimento *
              </Label>
              <Input
                id="dataNascimento"
                type="date"
                {...register("dataNascimento")}
                className={`${inputClass} ${
                  errors.dataNascimento ? "border-red-500" : ""
                }`}
                aria-invalid={errors.dataNascimento ? "true" : "false"}
              />
              {errors.dataNascimento && (
                <p className={errorClass}>{errors.dataNascimento.message}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-3">
            <div>
              <Label
                htmlFor="usuario"
                className="block text-sm font-medium text-cinza-texto mb-1"
              >
                Email *
              </Label>
              <Input
                id="usuario"
                type="email"
                placeholder="seu@email.com"
                {...register("usuario")}
                className={`${inputClass} ${
                  errors.usuario ? "border-red-500" : ""
                }`}
                aria-invalid={errors.usuario ? "true" : "false"}
              />
              {errors.usuario && (
                <p className={errorClass}>{errors.usuario.message}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="telefone"
                className="block text-sm font-medium text-cinza-texto mb-1"
              >
                Telefone *
              </Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(XX) XXXXX-XXXX"
                {...register("telefone")}
                className={`${inputClass} ${
                  errors.telefone ? "border-red-500" : ""
                }`}
                aria-invalid={errors.telefone ? "true" : "false"}
              />
              {errors.telefone && (
                <p className={errorClass}>{errors.telefone.message}</p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-3">
            <div>
              <Label
                htmlFor="senha"
                className="block text-sm font-medium text-cinza-texto mb-1"
              >
                Senha *
              </Label>
              <Input
                id="senha"
                type="password"
                placeholder="Mín. 8 caracteres, maiúscula, minúscula, número, símbolo"
                {...register("senha")}
                className={`${inputClass} ${
                  errors.senha ? "border-red-500" : ""
                }`}
                aria-invalid={errors.senha ? "true" : "false"}
              />
              {errors.senha && (
                <p className={errorClass}>{errors.senha.message}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="confirmaSenha"
                className="block text-sm font-medium text-cinza-texto mb-1"
              >
                Confirmar Senha *
              </Label>
              <Input
                id="confirmaSenha"
                type="password"
                placeholder="Confirme sua senha"
                {...register("confirmaSenha")}
                className={`${inputClass} ${
                  errors.confirmaSenha ? "border-red-500" : ""
                }`}
                aria-invalid={errors.confirmaSenha ? "true" : "false"}
              />
              {errors.confirmaSenha && (
                <p className={errorClass}>{errors.confirmaSenha.message}</p>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-3">
            <div>
              <Label
                htmlFor="foto"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL da Foto (opcional)
              </Label>
              <Input
                id="foto"
                type="url"
                placeholder="https://exemplo.com/foto.jpg"
                {...register("foto")}
                className={`${inputClass} ${
                  errors.foto ? "border-red-500" : ""
                }`}
                aria-invalid={errors.foto ? "true" : "false"}
              />
              {errors.foto && (
                <p className={errorClass}>{errors.foto.message}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="tipo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Usuário
              </Label>
              <Input
                id="tipo"
                type="number"
                placeholder="0 para padrão"
                {...register("tipo", { valueAsNumber: true })}
                className={inputClass}
                aria-invalid={errors.tipo ? "true" : "false"}
              />
              {errors.tipo && (
                <p className={errorClass}>{errors.tipo.message}</p>
              )}
            </div>
            <div className="flex items-start space-x-2 mt-3">
              <Checkbox
                id="aceitaTermos"
                checked={watchedAceitaTermos}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    setValue("aceitaTermos", checked);
                    trigger("aceitaTermos");
                  }
                }}
                className={`w-4 h-4 rounded-sm border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:text-white ${
                  errors.aceitaTermos ? "border-red-500" : ""
                }`}
                aria-invalid={errors.aceitaTermos ? "true" : "false"}
              />
              <div className="flex flex-col">
                <Label
                  htmlFor="aceitaTermos"
                  className="text-sm text-gray-700 leading-tight cursor-pointer"
                >
                  Aceito os{" "}
                  <a
                    href="/termos"
                    className="underline text-orange-600 hover:text-orange-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    termos e condições
                  </a>{" "}
                  *
                </Label>
                {errors.aceitaTermos && (
                  <p className={errorClass}>{errors.aceitaTermos.message}</p>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-laranja-tema">
      <Card className="w-full max-w-sm rounded-2xl border-none p-8 bg-white glass mx-3 gap-3">
        <CardHeader className="text-center pb-1">
          <CardTitle className="text-3xl font-bold text-orange-600 mb-2">
            {STEPS[currentStep - 1].title}
          </CardTitle>
          <CardDescription className="text-sm text-cinza-texto">
            Etapa {currentStep} de {STEPS.length}
            <div className="flex space-x-1.5 mt-4">
              {STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    index < currentStep ? "bg-orange-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <br />
            Preencha os campos abaixo para criar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col gap-3">
            {renderStepContent()}
            <div className={`
              flex w-full justify-between items-center mt-3 transition-all
            `}>
              <Button
                type="button"
                variant="outline"
                className={`py-2 text-sm font-semibold rounded-lg border border-gray-300 text-cinza-texto hover:bg-gray-100 transition-[width,opacity,transform] duration-300 ease-in-out ${
                  currentStep > 1
                    ? "w-38 scale-100"
                    : "w-0 absolute scale-0 pointer-events-none"
                }`}
                onClick={handlePrev}
                disabled={isLoading}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              {currentStep < STEPS.length ? (
                <Button
                  type="button"
                  className={`py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 bg-laranja-tema hover:bg-laranja-escuro text-white transition-[width,opacity] duration-300 ease-in-out ${
                    currentStep === 1 ? "w-full" : "w-38"
                  }`}
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  Próximo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={isLoading}
                  className="w-1/2 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300"
                  onClick={handleSubmit(handleCadastrar)}
                >
                  {isLoading ? (
                    <>
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="18"
                        visible
                      />
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              )}
            </div>
            <div className="text-center mt-3">
              <p className="text-sm text-cinza-texto">
                Já tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-orange-600 hover:text-orange-700 font-semibold underline-offset-2 hover:underline transition-colors duration-200"
                >
                  Faça login
                </button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CadastroNovo;
