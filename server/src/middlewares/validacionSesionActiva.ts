
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { getToken } from 'next-auth/jwt';

const secreto = process.env.NEXTAUTHSECRET as string;

const ValidacionSesionActiva = async (req: Request, res: Response, next: NextFunction) => {
    const sessionToken = req.cookies['next-auth.session-token'];
    const session = await getToken({req, secret: secreto});
    if(!sessionToken) {  
     res.status(400).json({message: 'No hay sesión activa'});
    } else {        
       next();     
    };
};

export default ValidacionSesionActiva;