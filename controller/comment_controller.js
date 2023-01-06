const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const queue = require('../config/kue');
const CommentEmailWorker = require('../workers/comment_email_worker');
//const commentsMailer = require('../mailers/comments_mailer');


module.exports.createComment = async function(req,res){    
    try{        
        let post = await Post.findById(req.body.post)
        if(post){            
            let comment = await Comment.create({
                content:req.body.content,
                user: req.user._id,
                post:req.body.post
            })            
            post.comments.push(comment);
            post.save();           
            
            comment = await comment.populate('user','username email')//getting problem here solve it            
            //commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){console.log('error while creating a queue ',err);return;}
                console.log('job enqued -- > ',job.id);
            });
            let username = comment.user.username;
            req.flash('success','comment published!!');            
            if(req.xhr){                
                return res.status(200).json({
                    data:{
                        comment : comment,
                        username : username
                    },
                    message : 'comment created'
                });
            }
            
            res.redirect('/');
        }
    }catch(err){
        req.flash('error',err);
        return;
    }
}

module.exports.destroyComment = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            comment.remove();            
            Post.findByIdAndUpdate(comment.post,{ $pull: {comments : req.params.id}},function(err,post){
                
                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            id : req.params.id,
                            message : 'comment is deleted!!!'
                        }
                    });
                }
                req.flash('success','comment is deleted!!!');
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}