import express from 'express';
const router = express.Router();
import { home } from '../controllers/home_controller.js'
import passport from 'passport';
import passportLocal from '../config/passport-local-strategy.js';
import { signIn, signUp, createUser, createSession, destroySession } from '../controllers/users_controller.js';

router.get('/home', passportLocal.checkAuthentication, home);
router.get('/sign-up', signUp);
router.post('/create', createUser);

router.get('/sign-in', signIn);
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' }
), createSession);
router.get('/sign-out', destroySession);
export default router;