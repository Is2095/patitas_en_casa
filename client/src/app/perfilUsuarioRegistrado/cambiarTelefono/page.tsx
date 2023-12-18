"use client"

import { useSession } from 'next-auth/react';
import { IoChevronBackOutline } from 'react-icons/io5';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import { validacionTelefono } from "@/validaciones/validaciones";
import axios from 'axios';


type Telefono = {
    telefono: string
};
type DatosUsuario = {
    id: string,
    email: string,
    image: string,
    name: string
};


const CambiarTelefono = () => {

    const { data: session, status } = useSession();
    const datosUsuario = session?.user as DatosUsuario;
    const initialValues = {
        telefono: ''
    };

    const onSubmit = async (values: Telefono, onSubmitProps: FormikHelpers<Telefono>) => {
        const result = await axios.patch(`http://localhost:3001/api/actualizarDatosUsuario/${datosUsuario.id}`, { telefono: values.telefono, email: datosUsuario.email });
    }
    return (
        <div>
            <div className='flex items-center gap-2'>
                <Link href='/perfilUsuarioRegistrado'>
                    <IoChevronBackOutline className='h-6 w-6 stroke-current' />
                </Link>
                <h3 className='text-xl font-bold leading-normal'>Número de teléfono</h3>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validacionTelefono}
            >
                {(formik: FormikProps<Telefono>) => {
                    return (
                        <Form>
                            <div>
                                <div>
                                    <Field
                                        type="text"
                                        name="telefono"
                                        placeholder="Ingrese teléfono actual..."
                                    />
                                    <ErrorMessage name='telefono' component="div" />
                                </div>
                                <div>
                                    <button type="submit" className="bg-indigo-500 px-4 py-2 rounded-lg">Actualizar teléfono</button>
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

export default CambiarTelefono;