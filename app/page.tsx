import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex w-full h-60 lg:h-screen lg:w-[70%] bg-slate-500 bg-login bg-blend-multiply text-white">
          <div className="flex items-start m-10">
            <Image
              className="flex w-auto h-auto "
              src="/assets/images/equipacare-logo.png"
              width={150}
              height={1}
              sizes=""
              alt="logo"
            />
          </div>
        </div>
        <div className="flex flex-col bg-white  text-black justify-start items-center w-full lg:w-[30%] lg:justify-center gap-4 h-screen">
          <Image
            className="w-auto h-auto"
            src="/assets/images/equipacare-fav.png"
            width={70}
            height={150}
            alt="logo"
          />
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold mb-2">Área comercial</h1>
            <span>Entre com o seu e-mail e senha</span>
          </div>
          <div className="flex flex-col gap-4 justify-center w-[70%] items-center">
            <form className="flex flex-col w-full gap-2  ">
              <Input type="email" placeholder="email@email.com" />
              <Input type="password" placeholder="******" />
              <Link href="/dashboard" className="">
                <Button className="mt-2 bg-[#A7B928] font-bold shadow-lg hover:bg-[#95a140] transform duration-500 w-full">
                  Entrar
                </Button>
              </Link>
            </form>
            <Button variant={"ghost"}>Esqueci minha senha</Button>
          </div>
          <footer className="flex flex-col items-center  absolute bottom-0 pb-5 text-sm">
            <p>
              ©2024{" "}
              <Link
                href="#"
                className="text-[#A7B928] hover:text-[#95a140] transform duration-150"
              >
                Equipacare
              </Link>{" "}
              - Todos os direitos reservados.
            </p>
            <p>
              Desenvolvido por{" "}
              <Link
                href="#"
                className="text-[#A7B928] hover:text-[#95a140] transform duration-150"
              >
                @eliasacneto
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
