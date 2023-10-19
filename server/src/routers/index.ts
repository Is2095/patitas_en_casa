
import {Router} from 'express';
import { ConfirmacionEmail } from '../controller';

const router = Router();

router.post('/confirmacion', ConfirmacionEmail);

export default router;