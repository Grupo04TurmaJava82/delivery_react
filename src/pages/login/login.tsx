import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RotatingLines } from "react-loader-spinner";
import type UsuarioLogin from "@/models/UsuarioLogin";
import { Button } from "@/components/ui/button";
import '@/utils/glass.css'

function Login() {
  const navigate = useNavigate();
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );
  const { handleLogin, isLoading } = useContext(AuthContext);

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({ ...usuarioLogin, [e.target.name]: e.target.value });
  }

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleLogin(usuarioLogin).then(() => navigate("/home"));
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-orange-100 to-laranja-tema">
      <Card className="max-w-sm w-full p-6 rounded-2xl shadow-xl border-none bg-white glass mx-4">
        <CardHeader className="text-center space-y-2">
          <img
            src="https://ik.imagekit.io/asis0anat/Log%20in%20hero%20img.svg?updatedAt=1752147028924"
            alt="Login"
            className="w-20 h-20 mx-auto"
          />
          <CardTitle className="text-3xl font-bold text-laranja-tema">
            Login
          </CardTitle>
          <CardDescription className="text-cinza-texto text-sm">
            Use seus dados e entre nessa missão com a gente!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={login} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuário</Label>
                <Input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Digite seu usuário"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  className="bg-orange-50 border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-orange-300 rounded-lg transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  className="bg-orange-50 border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-orange-300 rounded-lg transition-all duration-300"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 bg-laranja-tema hover:bg-laranja-escuro text-white transition-all duration-300"
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
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-cinza-texto">
            Não tem conta?{" "}
            <Link
              to="/cadastro"
              className="text-laranja-tema font-semibold underline hover:text-laranja-escuro"
            >
              Cadastre-se!
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;