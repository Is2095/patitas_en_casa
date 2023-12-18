
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type Usuario = {
    email: string | undefined | null,
    name: string | undefined | null,
    image: string | undefined | null
};

const MenuPerfilUsuario = ({ usuario }: { usuario: Usuario | undefined | null }) => {

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center">
                    {
                        !usuario?.image ? (
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                </svg>
                            </div>
                        ) :
                            <div className="flex items-center justify-center">
                                <img src={usuario?.image || ''} alt="no found"
                                    className="w-10 h-10 rounded-full p-2" />
                                <p className="text-sky-500">{usuario.name?.split(' ')?.[0]}</p>
                            </div>
                    }
                </Menu.Button>
                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-[9rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {
                                    ({ active }) => (
                                        <Link href='/perfilUsuarioRegistrado'>
                                            <button className={`${active ? "bg-[#868887be] text-white" : "text-gray-900"
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                Mi perfil
                                            </button>
                                        </Link>
                                    )
                                }
                            </Menu.Item>
                            <Menu.Item>
                                {
                                    ({ active }) => (
                                        <button className={`${active ? "bg-[#868887be] text-white" : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={async () => {
                                                await signOut({
                                                    callbackUrl: '/'
                                                })
                                            }} >
                                            Salir
                                        </button>
                                    )
                                }
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu >
    )
};

export default MenuPerfilUsuario;