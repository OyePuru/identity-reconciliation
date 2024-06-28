import { Router } from 'express';
import contactRouter from './contact/contact.router';

const router = Router();

router.use('/', contactRouter) // Can't use prefix as '/idenfity' route is specified in assignment.

export default router;
