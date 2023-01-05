const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const commentsMailer = require('../mailers/comments_mailer');

// module.exports.createComment = async function(req,res){
//     let user = await User.findById(req.user._id);
//     Post.findById(req.body.post,function(err,post){
        
//         if(post){            
//             Comment.create({
//                 content:req.body.content,
//                 user: req.user._id,
//                 post:req.body.post
//             },function(err,commentt){
//                 //handle the error
//                 if(err){console.log(err,'<<-- the error while creating the comment...');return;}
//                 post.comments.push(commentt);
//                 post.save();

//                 //commentt = commentt.populate('user','name').execPopulate();
//                 //commentsMailer.newComment(commentt);
                
//                 if(req.xhr){
//                     return res.status(200).json({
//                         data : {
//                             data : req.body.post,//post id
//                             comment : commentt,
//                             username : user.username                            
//                         },
//                         message : 'comment published!!!'
//                     });
//                 }
//                 req.flash('success','comment published!!');
//                 res.redirect('/');
//             });
//         }
//     });
// }


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
            commentsMailer.newComment(comment);

            let username = comment.user.username;            
            if(req.xhr){                
                return res.status(200).json({
                    data:{
                        comment : comment,
                        username : username
                    },
                    message : 'comment created'
                });
            }
            req.flash('success','comment published!!');
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