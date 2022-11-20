const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = function(req,res){
    Post.create({
        content : req.body.content,
        user: req.user._id // the req.user._id is got from app.use(passport.setAuthenticatedUser); in main index.js file
    },function(err,post){
        if(err){console.log(err,'<<--- the error while creating the database for posts , createPost()...');return;}
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){        
        // .id means id is converted into String by mongoose
        console.log(post,'THIS IS WHAT I WANT...');
        if(post.user == req.user.id){// the check is does requested id equals to the id of whom the post is posted
            post.remove();            

            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}