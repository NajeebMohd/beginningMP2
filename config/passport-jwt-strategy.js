const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    // finding jwt from the header1
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),//header is list of keys, header have a key called the authorization and this is also have a list of keys and auth.. have a key called bearer
    secretOrKey : 'codeial' // secret key for encryption
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad, done){ // here the fun after the opts is the callback fun where jwtPayLoad is information of payload of jwt token
    User.findById(jwtPayLoad._id,function(err, user){
        if(err){console.log('error in finding the user in jwt...',err); return;}
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));