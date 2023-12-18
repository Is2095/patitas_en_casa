
import { Request, Response } from "express";
import HandlersBuscarUsuario from '../handlers/handlers-BuscarUsuario';
import Usuario from '../modelos/usuarios';
import bcrypt from 'bcryptjs';

const ActualizarDatosUsuario = async (req: Request, res: Response) => {

    const datoAActualizar = req.body;
    const id = req.params.id;
    if (!id && !datoAActualizar.email) {
        return res.status(400).json({ menssage: 'Se requiere un identificar del usuario para actualizar los datos' });
    }
    const usuarioEmail = await HandlersBuscarUsuario({ email: datoAActualizar.email, _id: '' });
    const usuarioId = await HandlersBuscarUsuario({ _id: id, email: '' });
    if (!usuarioEmail && !usuarioId) {
        return res.status(400).json({ menssage: 'Faltan datos para buscar usuario' });
    } else {
        if (usuarioEmail?.email === usuarioId?.email) {
            const parametroAActualizar = Object.keys(datoAActualizar);
            if (parametroAActualizar.length > 2) return res.status(400).json({ menssage: 'error en el envío de datos a actualizar' });

            let key = parametroAActualizar[0];
            let value = datoAActualizar[key];

            if (key === 'contraseña') value = await bcrypt.hash(value, 12);

            const keyValue = Object.fromEntries([[key, value]]);

            const usuarioActualizado = await Usuario.findByIdAndUpdate(id, keyValue, { new: true });
            return res.status(200).json(usuarioActualizado);
        } else return res.status(200).json({ message: 'Error en los datos del usuario a actualizar' });
    }
};
export default ActualizarDatosUsuario;
