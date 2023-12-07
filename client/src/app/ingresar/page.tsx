"use client"

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import Swal from "sweetalert2";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import BotonGoogle from "@/componentes/botonGoogle";
import { validacionIngresar } from '@/validaciones/validaciones';

type TipoDatos = {
    email: string
    contraseña: string
}

function ingresarPage() {

    const router = useRouter();
    const [sitekey, setSitekey] = useState(process.env.NEXT_PUBLIC_CLAVE_DE_SITIO_RECAPTCHA);
    const recaptchaRef: React.RefObject<ReCAPTCHA> = React.createRef();
    const [noRobot, setNoRobot] = useState(false);
    const [errorRecaptcha, setErrorRecaptcha] = useState(false);

    const initialValues = {
        email: '',
        contraseña: '',
    };

    const onSubmit = async (values: TipoDatos, onSubmitProps: FormikHelpers<TipoDatos>) => {

        signIn('credentials', {
            email: values.email,
            contraseña: values.contraseña,
            redirect: false,
        })
            .then(res => {
                if (res?.error) {
                    Swal.fire({
                        title: `${res.error}`,
                        timer: 4000,
                        showConfirmButton: false
                    });
                    return console.log(`Error: ${res}`);
                }
                if (res?.ok) {
                    Swal.fire({
                        title: `Gracias has ingresado exitosamente a Patitas en Casa`,
                        timer: 3000,
                        showConfirmButton: false
                    });
                    recaptchaRef.current?.reset();
                    setNoRobot(false);
                    onSubmitProps.resetForm();

                    return router.push('/');
                };
            });
    };

    function onChangeRecaptcha(value: string | null) {
        if (value?.length !== 0) {
            setNoRobot(true);
        } else setNoRobot(false);
    };
    return (
        <div className="h-[calc(100vh-12rem)] flex border border-green-500">
            <div className="border border-black w-[50%]">
                <h1 className="text-4xl font-bold mb-7">Ingresá a Patitas en Casa</h1>
                <div className="flex gap-6 justify-start pb-4 ms-10">
                    <BotonGoogle />
                </div>
                <div className='flex items-center justify-center space-x-4'>
                    <div className='w-1/4 h-0.5 px-2 bg-black'></div>
                    <p className='mx-10'>O con email</p>
                    <div className='w-1/4 h-0.5 bg-black'></div>
                </div>
                <div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validacionIngresar}
                    >
                        {(formik: FormikProps<TipoDatos>) => {
                            return (
                                <Form>
                                    <div className="m-4">
                                        <Field
                                            type="text"
                                            name="email"
                                            placeholder="Ingrese su Email..."
                                            className="border pl-2"
                                        // disabled={emailConfirmado === true}
                                        />
                                        <ErrorMessage name="email" component="div" className="border" />
                                    </div>
                                    <div className="m-4">
                                        <Field
                                            type="password"
                                            name="contraseña"
                                            placeholder="Ingrese una Contraseña..."
                                            className="border pl-2"
                                        />
                                        <ErrorMessage name="contraseña" component="div" className="border" />
                                    </div>
                                    <div>
                                        {sitekey &&
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                sitekey={sitekey as string}
                                                onChange={onChangeRecaptcha}
                                            />
                                        }
                                        {!noRobot && errorRecaptcha &&
                                            <p>Debe marcar no soy Robot</p>
                                        }
                                    </div>
                                    <div>
                                        <button type="submit" className="bg-indigo-500 px-4 py-2 rounded-lg">Ingresar</button>
                                    </div>
                                </Form>
                            )
                        }

                        }

                    </Formik>
                </div>

            </div>
            <div className="justify-center flex items-center border border-red-600 w-[50%]">
                Foto
            </div>


        </div>
    )
}
export default ingresarPage;
