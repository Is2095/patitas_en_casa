
import { Router } from 'express';
import { ConfirmacionEmail, RegistrarUsuario, BuscarUsuario } from '../controller';
import ValidacionDatosParaRegistrarUsuario from '../middlewares/validarDatosUsuarioParaRegistrarse';
import ValidacionSesionActiva from '../middlewares/validacionSesionActiva';

const secreto = process.env.NEXTAUTHSECRET as string
const router = Router();

router.post('/confirmacion', ConfirmacionEmail);
router.post('/registrarUsuario', ValidacionDatosParaRegistrarUsuario, RegistrarUsuario);
router.post('/buscarUsuario', BuscarUsuario);
router.get('/prueba', ValidacionSesionActiva, () => {
    console.log('prueba superada');
})

export default router;