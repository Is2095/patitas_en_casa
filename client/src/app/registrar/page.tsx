"use client"

import axios, { AxiosError } from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import BotonGoogle from "../../componentes/botonGoogle";
import { validacionRegistrar } from "@/validaciones/validaciones";
import Recaptcha from "@/componentes/recaptcha/recaptcha";

type TipoDatos = {
  nombre: string
  apellido: string
  email: string
  contraseña: string
  contraseñaD: string
  recaptcha: boolean
}


function RegisPage() {

  const [noRobot, setNoRobot] = useState(false)
  const router = useRouter();
  const { data: session, status } = useSession();

  const initialValues = {
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    contraseñaD: '',
    recaptcha: false,
  };

  const onSubmit = async (values: TipoDatos, onSubmitProps: FormikHelpers<TipoDatos>) => {
    console.log('onSubmit');

    if (noRobot) {

      Swal.fire({
        title: 'Te has registrado en Patitas en casas',
        text: ' noRobot',
        icon: 'success'
      })
    }
  }

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
            validationSchema={validacionRegistrar}
          >
            {(formik: FormikProps<TipoDatos>) => {
              return (
                <Form>
                  <div>
                    <Field
                      type="text"
                      name="nombre"
                      placeholder="Ingrese su Nombre..."
                      className="border"
                    />
                    <ErrorMessage name="nombre" component="div" className="border" />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="apellido"
                      placeholder="Ingrese su Apellido..."
                      className="border"
                    />
                    <ErrorMessage name="apellido" component="div" className="border" />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Ingrese su Email..."
                      className="border"
                    />
                    <ErrorMessage name="email" component="div" className="border" />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="password"
                      placeholder="Ingrese una Contraseña..."
                      className="border"
                    />
                    <ErrorMessage name="password" component="div" className="border" />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="passwordD"
                      placeholder="Repita la contraseña..."
                      className="border"
                    />
                    <ErrorMessage name="passwordD" component="div" className="border" />
                  </div>
                  <div>
                    <Recaptcha setNoRobot={setNoRobot} />
                  </div>
                  <div>
                    <button type="submit" className="bg-indigo-500 px-4 py-2 rounded-lg">Registrarse</button>
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
