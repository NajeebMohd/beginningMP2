const comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.createComment = async function(req,res){
    let user = await User.findById(req.user._id);
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
                
                req.flash('success','comment published!!');
                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            data : req.body.post,
                            comment : comment,
                            username : user.username
                            
                        },
                        message : 'comment published!!!'
                    });
                }
                res.redirect('/');
            });
        }
    });
}

module.exports.destroyComment = function(req,res){
    comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            comment.remove();            
            Post.findByIdAndUpdate(comment.post,{ $pull: {comments : req.params.id}},function(err,post){
                req.flash('success','post published!!');
                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            id : req.params.id,
                            message : 'comment is deleted!!!'
                        }
                    });
                }
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}