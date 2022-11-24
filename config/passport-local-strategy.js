const passport = require('passport');

const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using passport
passport.use(new localStrategy({
        usernameField : 'email',
        passReqToCallback : true
    },
    function(req,email,password,done){
        //find user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                //console.log('error in finding user --->password...');
                req.flash('error',err);
                return done(err);
            } 
            if(!user || user.password != password){
                //console.log('invalid username or password...');
                req.flash('error','Invalid username or password');
                return done(null,false);
            }
            return done(null,user);

        });
    }
));


//Serializing the user to decide which key to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deSerializing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in deserializing...');
            return done(err);
        }
        return done(null,user);
    });
});

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is sign in then pass on the request to the next function(controller's action)
    console.log('in the authentication funtion...');
    if(req.isAuthenticated()) return next();
   
    return res.redirect('/userSignin');
}
passport.setAuthenticatedUser = function(req,res,next){
    // req.user contains the sign in user from session cookie and we are just sending it just to the locals for the views
    if(req.isAuthenticated()) res.locals.user = req.user;
    next();
}
passport.checkLoggedin = function(req,res,next){
    
}

module.exports = passport;