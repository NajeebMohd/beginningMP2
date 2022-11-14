const express = require('express');
const CookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}));
app.use(expressLayouts);
app.use(CookieParser());
//extract style and script from the sub pages into the layout page
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);



app.use(express.urlencoded());

app.use(express.static('assets'));
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
            mongoUrl : 'mongodb://localhost/codeial_development',
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

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('the error is : ',err);
        return;
    }
    console.log('server is started...');
});