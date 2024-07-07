import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../models/user.js';

const LocalStrategy =  passportLocal.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async (email, password, done) =>{
        try{
            let user = await User.findOne({email: email});
            if(!user || user.password != password){
                console.log("Invalid username/password");
                return done(null, false);
            }
            return done(null, user);
        }catch(err){
            console.log(err);
            return done(err);
        }
    }
));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    try{
        let user = await User.findById(id);
        return done(null, user);
    }catch(err){
        console.log(err);
    }
})

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();;
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

export default passport;