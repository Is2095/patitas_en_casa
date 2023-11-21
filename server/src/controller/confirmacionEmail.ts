
import crypto from 'crypto';

import EnvioCodigoConfirmacion from '../handlers/envioCodigoConfirmacion';
import UsuarioRegistrado from '../handlers/usuarioRegistrados';
import { Request, Response } from 'express';

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
            throw new Error(`El email: ${email} ya está registrado CONFIRMACION`)
        } else {
            const resultado = await EnvioCodigoConfirmacion(datos);
            if ('error' in resultado) {
                throw new Error('Hubo un error al enviar el código de confirmación');
            } else {
                return res.status(200).json({ codigoConfirmacion });
            }
        }
    } catch (error) {

        console.log(error, 'confirmacionEmail');
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        } else res.status(400).json(error)
    };
};

export default ConfirmacionEmail;
