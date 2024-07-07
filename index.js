import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
const port = 2021;
import fileUpload from 'express-fileupload';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import db from './config/mongoose.js'
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import session from 'express-session';
import passportLocal from './config/passport-local-strategy.js';
import cors from 'cors';

app.use(cors());
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = __dirname + '/uploads';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(uploadsPath, express.static(uploadsPath));

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'memories',
    secret: 'memoriesminimalgallery',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (10 * 60 * 1000)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passportLocal.setAuthenticatedUser);

app.use('/', routes);

app.listen(port, (err) => {
    if (err) {
        console.log(`error: ${err}`);
    }
    console.log(`Server is up and operating on port: ${port}`);
});