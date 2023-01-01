const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy(
    {
        clientID : '454773538885-5ai7bmeb18daknjm6610q73iiokcmhqn.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done){
        //find user
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google-oauth-strategy -->> ',err);return;}
            console.log(profile);

            if(user){
                //if found set this user as req.user
                done(null,user);
            }else{
                //if not found create the user and set is as req.user
                User.create({
                    email : profile.emails[0].value,
                    username : profile.displayName,
                    password : crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error while creating user in google-oauth-strategy -->> ',err);return;}
                    return done(null,user);
                });
            }
        });
    }

));

module.exports = passport;