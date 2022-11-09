const express = require('express');
const CookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(expressLayouts);
app.use(CookieParser());
//extract style and script from the sub pages into the layout page
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);



app.use(express.urlencoded());
app.use('/',require('./routes'));
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('the error is : ',err);
        return;
    }
    console.log('server is started...');
});