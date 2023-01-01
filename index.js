const express = require('express');
const CookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const MongoStore = require('connect-mongo');
//const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashMW = require('./config/middleware');


// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix:'/css'
// }));
app.use(expressLayouts);
app.use(CookieParser());
//extract style and script from the sub pages into the layout page
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);



app.use(express.urlencoded());

app.use(express.static('assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));
// make the upload path available for browser
app.set('view engine', 'ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    //todo change the secret when production development
    secret : 'blah',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge:(1000 * 60 * 10)
    },
    store:MongoStore.create(
        {
            mongoUrl : 'mongodb://127.0.0.1:27017/codeial_development',
            autoRemove : 'Disabled',
            mongoOptions : {}
        },
        function(err){
            console.log(err || 'connect mongodb connect ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMW.setFlash); 

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('the error is : ',err);
        return;
    }
    console.log('server is started...');
});