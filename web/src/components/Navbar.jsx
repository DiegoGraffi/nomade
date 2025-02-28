import React from "react";
import Link from "next/link";
import Logo from "../../public/images/Logo.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import { getLoggedInUser, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function NavigationMenuDemo() {
  const user = await getLoggedInUser();

  async function logout() {
    "use server";

    const session = await getSession();

    session.destroy();

    redirect("/register");
  }

  return (
    <div className="flex flex-row justify-between py-3 px-4 w-screen absolute z-[10] top-0">
      <Image src={Logo} width={60} alt="logo" />
      <div className="flex items-center">
        <ul className="flex md:gap-2.5">
          <li className="text-xs font-light cursor-pointer bg-neutral-400 text-white hover:bg-black transition-all ease-in-out duration-150 py-2 px-3 rounded-md">
            <Link href="/">Inicio</Link>
          </li>
          <li className="text-xs font-light cursor-pointer bg-neutral-400 text-white hover:bg-black transition-all ease-in-out duration-150 py-2 px-3 rounded-md">
            <Link href="/#nosotros">Nosotros</Link>
          </li>
          <li className="text-xs font-light cursor-pointer bg-neutral-400 text-white hover:bg-black transition-all ease-in-out duration-150 py-2 px-3 rounded-md">
            <Link href="/#category">Categorias</Link>
          </li>
          <li className="text-xs font-light cursor-pointer bg-neutral-400 text-white hover:bg-black transition-all ease-in-out duration-150 py-2 px-3 rounded-md">
            <Link href="/#contacto">Contacto</Link>
          </li>
          <li className="text-xs font-light cursor-pointer bg-neutral-400 text-white hover:bg-black transition-all ease-in-out duration-150 py-2 px-3 rounded-md">
            <Link href="/products">Productos</Link>
          </li>
          {user?.admin && (
            <li className="group text-xs font-light cursor-pointer bg-neutral-400 text-white hover:bg-black transition-all ease-in-out duration-150 py-2 px-3 rounded-md relative">
              <Link href="/admin">Admin</Link>
            </li>
          )}
        </ul>
      </div>
      {user ? (
        <div className="flex gap-2 items-center">
          <h1>
            Hola <b>{user.name}</b>!
          </h1>

          <form action={logout}>
            <Button className="bg-black hover:bg-accent hover:border-red-400 w-full shadow-none hover:text-accent-foreground border text-xs">
              Cerrar Sesion
            </Button>
          </form>
          <Link href="/cart">
            <Button className="bg-black hover:bg-accent hover:border-blue-400 w-full shadow-none hover:text-accent-foreground border text-xs">
              Carrito
            </Button>
          </Link>
        </div>
      ) : (
        <Link href="/register">
          <Button className="bg-black hover:bg-accent w-full shadow-none hover:text-accent-foreground">
            <p className="font-light">
              Iniciar Sesión /{" "}
              <span className="font-semibold">Registrarse</span>
            </p>
          </Button>
        </Link>
      )}
    </div>
  );
}

export default NavigationMenuDemo;
