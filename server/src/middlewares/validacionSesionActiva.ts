
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { getToken } from 'next-auth/jwt';
import HandlersBuscarUsuario from '../handlers/handlers-BuscarUsuario';

const secreto = process.env.NEXTAUTHSECRET as string;

const ValidacionSesionActiva = async (req: Request, res: Response, next: NextFunction) => {

    const sessionToken = req.cookies['next-auth.session-token'];

    const session = await getToken({ req, secret: secreto });

    const { email } = req.body;
    let usuario2
    if (session?.email && sessionToken) {
        
        const usuario = await HandlersBuscarUsuario({ email: session?.email });
        if (usuario) usuario2 = usuario.usuarioEmail
        if (usuario2?.email === email) {
            next()
        } else {
            res.status(400).json({ message: 'Error de sesión 1' });
        }
    } else res.status(400).json({ message: 'Error de sesión 2' });
};

export default ValidacionSesionActiva;