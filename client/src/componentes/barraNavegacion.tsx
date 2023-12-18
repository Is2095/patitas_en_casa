'use client'

import Link from "next/link";
import { useSession } from 'next-auth/react';
import MenuPerfilUsuario from "./menuPerfilUsuario";

type Usuario = {
  email: string | undefined,
  name: string | undefined,
  image: string | undefined
};

function BarraNavegacion() {

  const { data: session, status } = useSession();
  const usuario = session?.user as Usuario;

  return (

    <nav className="border border-black p-2">
      <div className="flex justify-around  border border-red-800 m-1">
        <Link href='/'>
          <h1 className="font-bold text-xl">
            Patitas en casa
          </h1>
        </Link>
        <ul className="flex items-center justify-center">
          <li className="mx-2">
            {status === 'authenticated' ?
              (
                null
              ) :
              (
                <Link href='/registrar' className="text-sky-700 hover:text-sky-900 hover:font-bold">Registrarse</Link>
              )
            }
          </li>
          {
            status === 'authenticated' ? (
              <MenuPerfilUsuario usuario={usuario} />
            ) :
              <li className="mx-2">
                <Link href='/ingresar' className="text-sky-700 hover:text-sky-900 hover:font-bold">Ingresar</Link>
              </li>
          }
        </ul>
      </div>
      <div className="border border-red-400 m-1">
        <ul className="flex">
          <li className="mx-3">
            <Link href='/' className="text-sky-700 hover:text-sky-900 hover:font-bold">Inicio</Link>
          </li>
          <li className="mx-3">
            <Link href='/protectoras' className="text-sky-700 hover:text-sky-900 hover:font-bold">Protectoras</Link>
          </li>
          <li className="mx-3">
            <Link href='adopcion' className="text-sky-700 hover:text-sky-900 hover:font-bold">Dar en adopción</Link>
          </li>
          <li className="mx-3">
            <Link href='match' className="text-sky-700 hover:text-sky-900 hover:font-bold">Busca tu match</Link>
          </li>
          <li className="mx-3">
            <Link href='/acercaDeMi' className="text-sky-700 hover:text-sky-900 hover:font-bold">Acerca de</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BarraNavegacion;
