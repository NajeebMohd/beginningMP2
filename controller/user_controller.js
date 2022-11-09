const User = require('../models/user');


module.exports.profile = function(req,res){
    console.log('profile controller started...');
    //console.log(req.cookies);
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                console.log(user);
                return res.render('profile',{
                    user : user,
                    title:"the profile page secured"
                });
            }
            res.redirect('/userSignin');
            
        });
    }else{
        res.redirect('/userSignin');
    }
    
    
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
    // steps for authentication
    //find user
    User.findOne({email:req.body.email}, function(err,user){
        if(err) {console.log('error in finding in user for authentication user...');return}
        //handle user found
        if(user){
            //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id',user.id);
            
            return res.redirect('/profile'); 

        }else{
            //if user is not found
            return res.redirect('back');
        }
    });
}

module.exports.signout = function(req,res){
    console.log('signout controller is started...');
    res.cookie('user_id',1);
    return res.redirect('back');
}