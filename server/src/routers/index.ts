
import {Router} from 'express';
import { ConfirmacionEmail, RegistrarUsuario } from '../controller';

const router = Router();

router.post('/confirmacion', ConfirmacionEmail);
router.post('/registrarUsuario', RegistrarUsuario)

export default router;