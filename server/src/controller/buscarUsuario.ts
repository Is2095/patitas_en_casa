
import { Request, Response } from 'express';
import { errorMonitor } from 'nodemailer/lib/xoauth2';
import HandlersBuscarUsuarioContraseña from '../handlers/handlers-BuscarUsuarioContraseña';


const BuscarUsuario = async (req: Request, res: Response) => {

    const { email, id } = req.body;

    try {
        const usuarioBuscado = await HandlersBuscarUsuarioContraseña({ email, id });
        if (!usuarioBuscado) {
            res.status(400).json({ message: `El email: ${email} no existe en nuestra base de datos` });
        } else {
            return res.status(200).json(usuarioBuscado);
        };
    } catch (error) {
        if (error) {
            res.status(400).json({ message: error });
        } else res.status(400).json(errorMonitor);
    };
};

export default BuscarUsuario;