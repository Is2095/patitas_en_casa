'use client'

import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';

function BarraNavegacion() {

  const { data: session, status } = useSession();

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
          {status === 'authenticated' ? (
            <li className="mx-2">
              <button className="text-red-500 hover:text-red-700 hover:font-bold p-2" onClick={async () => {
                await signOut({
                  callbackUrl: '/'
                })
              }} >Salir</button>
            </li>) :
            <li className="mx-2">
              <Link href='/login' className="text-sky-700 hover:text-sky-900 hover:font-bold">Ingresar</Link>
            </li>
          }
          {
            status === 'authenticated' ? (
              !session?.user?.image ? (
                <div className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                </div>
              ) : <img src={session?.user?.image || ''} alt=""
                className="w-10 h-10 rounded-full p-2"
              />) : null
          }
          <li className="flex justify-center px-2">
            <p className="text-sky-500">{session?.user?.name?.split(' ')?.[0]}</p>
          </li>


        </ul>
      </div>

      <div className="border border-red-400 m-1">
        <ul className="flex">
          <li className="mx-3">
            <Link href='/' className="text-sky-700 hover:text-sky-900 hover:font-bold">Inicio</Link>
          </li>
          <li className="mx-3">
            <Link href='' className="text-sky-700 hover:text-sky-900 hover:font-bold">Protectoras</Link>
          </li>
          <li className="mx-3">
            <Link href='' className="text-sky-700 hover:text-sky-900 hover:font-bold">Dar en adopción</Link>
          </li>
          <li className="mx-3">
            <Link href='' className="text-sky-700 hover:text-sky-900 hover:font-bold">Busca tu match</Link>
          </li>
          <li className="mx-3">
            <Link href='/about' className="text-sky-700 hover:text-sky-900 hover:font-bold">Acerca de</Link>
          </li>
        </ul>
      </div>
    </nav>

  );

};

export default BarraNavegacion;
