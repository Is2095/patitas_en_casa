
import { Router } from 'express';
import { ConfirmacionEmail, RegistrarUsuario, BuscarUsuario, ActualizarDatosUsuario } from '../controller';
import ValidacionDatosParaRegistrarUsuario from '../middlewares/validarDatosUsuarioParaRegistrarse';
import ValidacionSesionActiva from '../middlewares/validacionSesionActiva';

const router = Router();

router.post('/confirmacion', ConfirmacionEmail);
router.post('/registrarUsuario', ValidacionDatosParaRegistrarUsuario, RegistrarUsuario);
router.post('/buscarUsuario', BuscarUsuario);
router.get('/prueba', ValidacionSesionActiva, () => {
    console.log('prueba superada');
})

router.patch('/actualizarDatosUsuario/:id', ValidacionSesionActiva, ActualizarDatosUsuario);

export default router;