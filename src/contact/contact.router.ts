import { Router } from 'express';
import { ContactController } from './contact.controller';

const router = Router();

const controller = new ContactController();

router.post('/identify', controller.create);

export default router;
