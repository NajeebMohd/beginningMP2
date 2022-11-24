const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){

        return res.render('profile',{
            title : "Secured Profile page",
            profile_user : user
        });
    });
    
}
module.exports.user = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    console.log('user controller started...');
    return res.render('user',{
        title : "user page"
    });
}

module.exports.userSignin = function(req,res){
    if(req.isAuthenticated()){

        return res.redirect('/profile');
    }
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
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {        
        if (err) { return next(err); }
        req.flash('success','you have logged out successfully');
        res.redirect('/');
    });   
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

