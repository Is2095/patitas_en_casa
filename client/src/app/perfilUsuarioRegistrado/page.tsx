

import Link from 'next/link';
import { AiOutlineCalendar, AiOutlinePhone } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

const PerfilUsuarioRegistrado = () => {

    return (
        <div className='mt-[1rem]'>
            <h3 className='text-xl font-bold leading-normal ml-5'>Mi Cuenta</h3>
            <div className='flex flex-col gap-4 mt-4 w-[60%]'>
                <Link rel='stylesheet' href="/perfilUsuarioRegistrado/cambiarTelefono">
                    <div className='bg-white flex items-center gap-2 w-full mb-6 shadow-xl rounded-lg p-4 hover:bg-[#868887be] duration-200 hover:text-white'>
                        <AiOutlinePhone className="h-6 w-6 stroke-current" />
                        Cambiar número telefónico
                    </div>
                </Link>
                <Link rel='stylesheet' href="/perfilUsuarioRegistrado/cambiarFechaNacimiento">
                    <div className='bg-white flex items-center gap-2 w-full mb-6 shadow-xl rounded-lg p-4 hover:bg-[#868887be] duration-200 hover:text-white'>
                        <AiOutlineCalendar className="h-6 w-6 stroke-current" />
                        Cambiar Fecha de Nacimiento
                    </div>
                </Link>
                <Link rel="stylesheet" href="/perfilUsuarioRegistrado/cambiarContrasena">
                    <div className='bg-white flex items-center gap-2 w-full mb-6 shadow-xl rounded-lg p-4 hover:bg-[#868887be] duration-200 hover:text-white'>
                        <RiLockPasswordLine className="h-6 w-6 stroke-current" />
                        Cambiar contraseña
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default PerfilUsuarioRegistrado;