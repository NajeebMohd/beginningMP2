const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('profile',{
        title : "Secured Profile page"
    });
}
module.exports.user = function(req,res){
    console.log('user controller started...');
    return res.render('user',{
        title : "user page"
    });
}

module.exports.userSignin = function(req,res){
    console.log('userSignin controller started...');
    return res.render('userSign_in',{
        title : "user Sign in"
    });
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password) return res.redirect('back');

    User.findOne({email:req.body.email},function(err,user){
        if(err) {console.log('error in finding in user for creating user...');return}
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating the user data...'); return}
                return res.redirect('/userSignin');
            });
        }else{
            return res.redirect('back');
        }
    });
}
module.exports.createSession = function(req,res){
    // return res.render('profile',{
    //     title : "Secured profile page"
    // });
    return res.redirect('/');
}