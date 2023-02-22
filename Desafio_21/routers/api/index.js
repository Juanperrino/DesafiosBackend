import { Router } from 'express';

import graphql from './graphql.js';
const router = Router();

router.use('/', graphql);

export default router;
