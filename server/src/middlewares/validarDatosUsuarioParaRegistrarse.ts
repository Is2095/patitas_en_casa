
import { NextFunction, Request, Response } from "express";
import { validacionDatosParaRegistrarUsuario } from '../validaciones/validacionesSchemas';

const ValidacionDatosParaRegistrarUsuario = async (req: Request, res: Response, next: NextFunction) => {

    const datosUsuario = req.body;

    if (!datosUsuario.confirmado && datosUsuario.confirmado !== undefined) {
        res.status(400).json({ error: 'El email ingresado no ha sido confirmado' });
    } else {
        validacionDatosParaRegistrarUsuario.validate(datosUsuario, { abortEarly: false })
            .then(() => {
                next();
            })
            .catch(error => {
                res.status(400).json({ error: error.errors });
            });
    };
};

export default ValidacionDatosParaRegistrarUsuario;
