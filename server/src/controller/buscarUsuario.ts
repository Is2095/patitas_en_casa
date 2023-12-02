
import { Request, Response } from 'express';
import { conectar } from '../baseDeDatos/conectar';
import Usuarios from '../modelos/usuarios';
import { errorMonitor } from 'nodemailer/lib/xoauth2';

const BuscarUsuario = async (req: Request, res: Response) => {

    const { email } = req.body;

    try {
        await conectar()

        const usuarioBuscado = await Usuarios.findOne({ email }).select("+contraseña")
        if (!usuarioBuscado) {
            res.status(400).json('Usuario no existe')
        } else {             
            const dato = {
                id: usuarioBuscado._id,
                email: usuarioBuscado.email,
                contraseña: usuarioBuscado.contraseña,
                nombre: usuarioBuscado.nombre,
                telefono: usuarioBuscado.telefono,    
                imagen: usuarioBuscado.imagen,               
             };       
            return res.status(200).json({dato});
        };
    } catch (error) {
        res.status(400).json(errorMonitor);
    };
};

export default BuscarUsuario;