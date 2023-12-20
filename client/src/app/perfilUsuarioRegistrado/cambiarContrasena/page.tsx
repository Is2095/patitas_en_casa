"use client"

import { useSession } from 'next-auth/react';
import { IoChevronBackOutline } from 'react-icons/io5';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import { validacionContraseña } from "@/validaciones/validaciones";
import axios from 'axios';

axios.defaults.withCredentials = true

type Contraseña = {
    contraseña: string
    contraseñaD: string
};
type DatosUsuario = {
    id: string,
    email: string,
    image: string,
    name: string,
};
const CambiarContrasena = () => {
    const { data: session, status } = useSession();
    const datosUsuario = session?.user as DatosUsuario;
    const initialValues = {
        contraseña: '',
        contraseñaD: '',
    };

    const onSubmit = async (values: Contraseña, onSubmitProps: FormikHelpers<Contraseña>) => {
        await axios.patch(`http://localhost:3001/api/actualizarDatosUsuario/${datosUsuario.id}`, { contraseña: values.contraseña, email: datosUsuario.email })
        .then(data => console.log(data.data))
        .catch(error => console.log(error))
    };

    return (
        <div>
            <div className='flex items-center gap-2'>
                <Link href='/perfilUsuarioRegistrado'>
                    <IoChevronBackOutline className='h-6 w-6 stroke-current' />
                </Link>
                <h3 className='text-xl font-bold leading-normal'>Contraseña</h3>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validacionContraseña}
            >
                {(formik: FormikProps<Contraseña>) => {
                    return (
                        <Form>
                            <div>
                                <div className="m-4">
                                    <Field
                                        type="password"
                                        name="contraseña"
                                        placeholder="Ingrese nueva contraseña..."
                                    />
                                    <ErrorMessage name='contraseña' component="div" />
                                </div>
                                <div className="m-4">
                                    <Field
                                        type="password"
                                        name="contraseñaD"
                                        placeholder="Repita la contraseña..."
                                        className="border pl-2"
                                    />
                                    <ErrorMessage name="contraseñaD" component="div" className="border" />
                                </div>

                                <div>
                                    <button type="submit" className="bg-indigo-500 px-4 py-2 rounded-lg">Actualizar contraseña</button>
                                </div>
                            </div>
                        </Form>
                    )
                }
                }
            </Formik>
        </div>
    );
};
export default CambiarContrasena;