const Post = require('../models/post');

module.exports.createPost = function(req,res){
    Post.create({
        content : req.body.content,
        user: req.user._id // the req.user._id is got from app.use(passport.setAuthenticatedUser); in main index.js file
    },function(err,post){
        if(err){console.log(err,'<<--- the error while creating the database for posts , createPost()...');return;}
        return res.redirect('back');
    });
}