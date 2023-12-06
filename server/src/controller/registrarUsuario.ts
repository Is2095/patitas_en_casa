
import { conectar } from '../baseDeDatos/conectar';
import Usuarios from '../modelos/usuarios';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';


const RegistrarUsuario = async (req: Request, res: Response) => {

    const { email } = req.body;
    const datosDelUsuario = req.body;
    const nombreCompleto = datosDelUsuario.nombre.concat(" ", datosDelUsuario.apellido);

    try {
        await conectar();
        const emailRegistrado = await Usuarios.findOne({ email });
        if (emailRegistrado !== null) {
            throw new Error(`El email: ${email} ya está registrado RU`);
        } else {
            const contraseñaHashed = await bcrypt.hash(datosDelUsuario.contraseña, 12);
            const user = new Usuarios({ ...datosDelUsuario, contraseña: contraseñaHashed, nombre: nombreCompleto });
            const saveUser = await user.save();
            res.status(200).json({ nombre: saveUser.nombre, email: saveUser.email });

        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(400).json({ error: error.message });
        } else res.status(400).json(error);
    }
}

export default RegistrarUsuario;
