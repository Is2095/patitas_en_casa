
import crypto from 'crypto';

import EnvioCodigoConfirmacion from '../handlers/envioCodigoConfirmacion';
import UsuarioRegistrado from '../handlers/usuarioRegistrados';
import { Request, Response } from 'express';

import { conectar } from '../baseDeDatos/conectar';
import Usuarios from '../modelos/usuarios';

type Datos = {
    email: string
    nombre: string
    cuerpo: string
    motivo: string
    remitente: string
    nameRemitente: string
}

const ConfirmacionEmail = async (req: Request, res: Response) => {

    const { email, nombre } = req.body;
    const codigoConfirmacion = crypto.randomBytes(3).toString('hex');

    const datos: Datos = {
        email,
        nombre,
        cuerpo: `Para confirmar el email ingrese en la aplicación el siguiente código ${codigoConfirmacion}`,
        motivo: 'Confirmación de email',
        remitente: process.env.CORREO_REMITENTE_CONFIRMACION as string,
        nameRemitente: 'Patitas en casa',
    };

    try {

        const usuarioEmail = await UsuarioRegistrado({ email, nombre });
        if (usuarioEmail !== null) {
            res.status(400).json({ message: 'El email ingresado ya está registrado' });
        }
        // else {
        //     await conectar();
        //     // const emailRegistrado = await Usuarios.findOne({ email })


        //         const user = new Usuarios({
        //             email,
        //             nombre,
        //         })
        //         const saveUser = await user.save();
        //         res.status(200).json(saveUser) 
        // }

        const resultado = await EnvioCodigoConfirmacion(datos);
        if ('error' in resultado) {
            res.status(500).json({ message: 'Hubo un error al enviar del código de confirmación' });
        };
        return res.status(200).json({codigoConfirmacion});

    } catch (error) {
        res.status(400).json({ error });
    };

};

export default ConfirmacionEmail;
