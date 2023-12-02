
import {Router} from 'express';
import { ConfirmacionEmail, RegistrarUsuario, BuscarUsuario } from '../controller';
import ValidacionDatosParaRegistrarUsuario from '../middlewares/validarDatosUsuarioParaRegistrarse';

const router = Router();

router.post('/confirmacion', ConfirmacionEmail);
router.post('/registrarUsuario', ValidacionDatosParaRegistrarUsuario, RegistrarUsuario);
router.post('/buscarUsuario', BuscarUsuario);

export default router;