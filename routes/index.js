import express from 'express';
import users from '../routes/users.js';
import colllection from './collection.js';
import memory from './memory.js';
import passport from 'passport';
import passportLocal from '../config/passport-local-strategy.js';

const router = express.Router();

console.log('Router is working');

router.get('/', (req, res) => {
    return res.render('profile.ejs');
});

router.use('/users', users);
router.use('/collection', passport.checkAuthentication, colllection);
router.use('/memory', passport.checkAuthentication, memory);

export default router;