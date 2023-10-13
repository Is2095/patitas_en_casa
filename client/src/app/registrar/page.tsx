"use client"

// import axios, { AxiosError } from "axios";
import { FormEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import BotonGoogle from "../../componentes/botonGoogle";
import Swal from "sweetalert2";

function RegisPage() {

  const router = useRouter();

  return (
 <div className="justify-center h-[calc(100vh-12rem)] flex flex-col items-center">
      {/* <div className="flex border border-cyan-700 bg-gradient-to-b from-cyan-200 to-cyan-600 px-8 py-10 h-[26rem] w-3/10 rounded-lg"> */}
        <h1 className="text-4xl font-bold mb-7">Crea tu cuenta</h1>
        <div className="flex gap-6 justify-center pb-4">
          <BotonGoogle />
        </div>
        <button className="bg-indigo-500 px-4 py-2 rounded-lg">Registrarse</button>
      {/* </div> */}
    </div>
  );

};

export default RegisPage;
