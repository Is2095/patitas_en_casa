
import {Router} from 'express';
import { ConfirmacionEmail, RegistrarUsuario } from '../controller';
import ValidacionDatosParaRegistrarUsuario from '../middlewares/validarDatosUsuarioParaRegistrarse';

const router = Router();

router.post('/confirmacion', ConfirmacionEmail);
router.post('/registrarUsuario', ValidacionDatosParaRegistrarUsuario, RegistrarUsuario)

export default router;