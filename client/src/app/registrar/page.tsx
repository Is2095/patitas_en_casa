"use client"

import React from 'react'
import axios, { AxiosError } from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import { useSession } from 'next-auth/react';
import { useState } from "react";
import Swal from "sweetalert2";
import BotonGoogle from "../../componentes/botonGoogle";
import { validacionRegistrar, validacionConfirmar } from "@/validaciones/validaciones";
import ReCAPTCHA from "react-google-recaptcha";

type TipoDatos = {
  nombre: string
  apellido: string
  email: string
  contraseña: string
  contraseñaD: string
  telefono: string
}

function RegisPage() {

  const [sitekey, setSitekey] = useState(process.env.NEXT_PUBLIC_CLAVE_DE_SITIO_RECAPTCHA);
  const recaptchaRef: React.RefObject<ReCAPTCHA> = React.createRef()

  const [noRobot, setNoRobot] = useState(false)
  const [errorRecaptcha, setErrorRecaptcha] = useState(false)
  const [emailConfirmado, setEmailConfirmado] = useState(false)
  const { data: session, status } = useSession();

  const initialValues = {
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    contraseñaD: '',
    telefono: '',
  };

  const onSubmit = async (values: TipoDatos, onSubmitProps: FormikHelpers<TipoDatos>) => {
    const { contraseñaD, ...datosUsurarioARelgistrar } = values
    await axios.post("http://localhost:3001/api/registrarUsuario", { ...datosUsurarioARelgistrar, confirmado: emailConfirmado })
      .then((data) => {
        Swal.fire({
          title: `Gracias: ${data.data.nombre}, te has registrado exitosamente`,
          timer: 3000,
          showConfirmButton: false
        });
      })
      .catch(error => {
        Swal.fire({
          title: `Se a producido un error inesperado`,
          text: `${error.response.data.error}`,
          icon: 'error'
        })
      })
    //console.log('respuesta servidor registrar usuario', registrarUsuario.data);

  }

  const confirmarEmail = async ({ nombre, email }: { nombre: string, email: string }) => {

    //if(noRobot) setEmailConfirmado(true)

    if (noRobot) {
      setErrorRecaptcha(false)
      await axios.post("http://localhost:3001/api/confirmacion", { nombre, email })
        .then(envioEmailCodigo => {
          if (envioEmailCodigo.data.codigoConfirmacion) {
            const result = Swal.fire({
              title: 'Ingrese el código',
              input: 'text',
              inputPlaceholder: 'Ingrese el código...',
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value || value !== envioEmailCodigo.data.codigoConfirmacion) {
                  return 'Código incorrecto'
                } else {
                  // setNoRobot(false)
                  return null
                }
              }
            })
              .then(resultado => {
                if (resultado.isConfirmed) {
                  Swal.fire({
                    title: 'Email confirmado',
                    timer: 2000,
                    showConfirmButton: false
                  });
                  setEmailConfirmado(true)
                  return
                } else {
                  Swal.fire({
                    title: 'Se a producido un error en la recepción del código de confirmación',
                    icon: 'error'
                  })
                }
              })
          }
        })



        //} else setErrorRecaptcha(true)

        .catch(error => {
          console.log(error);

          Swal.fire({
            title: error.response.data.error,
            icon: 'error'
          })
        })







    }
  }
  function onChangeRecaptcha(value: string | null) {
    if (value?.length !== 0) {
      setNoRobot(true);
    } else setNoRobot(false);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex">
      <div className='border border-black w-[50%]'>
        <h1 className="text-4xl font-bold mb-7">Únete a Patitas en Casa</h1>
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
            validationSchema={emailConfirmado ? validacionRegistrar : validacionConfirmar}
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
                      disabled={emailConfirmado === true}
                    />
                    <ErrorMessage name="email" component="div" className="border" />
                  </div>
                  <div className="m-4">
                    <Field
                      type="text"
                      name="nombre"
                      placeholder="Ingrese su Nombre..."
                      className="border pl-2"
                      disabled={emailConfirmado === true}
                    />
                    <ErrorMessage name="nombre" component="div" className="border" />
                  </div>
                  {emailConfirmado &&
                    <div>
                      <div className="m-4">
                        <Field
                          type="text"
                          name="apellido"
                          placeholder="Ingrese su Apellido..."
                          className="border pl-2"
                        />
                        <ErrorMessage name="apellido" component="div" className="border" />
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
                      <div className="m-4">
                        <Field
                          type="password"
                          name="contraseñaD"
                          placeholder="Repita la contraseña..."
                          className="border pl-2"
                        />
                        <ErrorMessage name="contraseñaD" component="div" className="border" />
                      </div>
                      <div className="m-4">
                        <Field
                          type="text"
                          name="telefono"
                          placeholder="Teléfono de contacto..."
                          className="border pl-2"
                        />
                        <ErrorMessage name="telefono" component="div" className="border" />
                      </div>

                    </div>

                  }
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
                  {
                    emailConfirmado ?
                      <div>
                        <button type="submit" className="bg-indigo-500 px-4 py-2 rounded-lg">Registrarse</button>
                      </div> :
                      <div>
                        <button type="button" onClick={() => confirmarEmail({ nombre: formik.values.nombre, email: formik.values.email })} className="bg-indigo-500 px-4 py-2 rounded-lg">Confirmar email</button>
                      </div>
                  }

                  <div>
                    <button
                      type="reset"
                      className="bg-red-400 px-4 py-2 rounded-lg"
                      onClick={() => {
                        recaptchaRef.current?.reset()
                        setNoRobot(false)
                        formik.resetForm()
                      }
                      }
                    >Borrar Formulario</button>
                  </div>
                </Form>
              )
            }

            }
          </Formik>
        </div>
      </div>
      <div className='justify-center flex items-center border border-red-600 w-[50%]'>
        foto
      </div>

    </div>
  );

};

export default RegisPage;
