const comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            comment.create({
                content:req.body.content,
                user: req.user._id,
                post:req.body.post
            },function(err,comment){
                //handle the error
                if(err){console.log(err,'<<-- the error while creating the comment...');return;}
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}