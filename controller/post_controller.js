const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

// module.exports.createPost = function(req,res){
//     Post.create({
//         content : req.body.content,
//         user: req.user._id // the req.user._id is got from app.use(passport.setAuthenticatedUser); in main index.js file
//     },function(err,post){
//         if(err){console.log(err,'<<--- the error while creating the database for posts , createPost()...');return;}
//         return res.redirect('back');
//     });
// }

module.exports.createPost = async function(req,res){
    try{
        let post = await Post.create({
            content : req.body.content,
            user: req.user._id 
        })
        let user = await User.findById(post.user);
        
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : post,
                    username : user.username
                },
                message : 'Post published!!!'
            });
        }
        req.flash('success','post published!!');
        
        return res.redirect('back');
        
    }catch(err){
        req.flash('error',err);
        console.log(err,' <<-- the error while creating the posts...');
        return res.redirect('back');
    }
}

// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id,function(err,post){        
//         // .id means id is converted into String by mongoose
//         console.log(post,'THIS IS WHAT I WANT...');
//         if(post.user == req.user.id){// the check is does requested id equals to the id of whom the post is posted
//             post.remove();            

//             Comment.deleteMany({post: req.params.id},function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }



module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();


            await Comment.deleteMany({post: req.params.id});
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message : "post deleted"
                });
            }
            req.flash('success','post is deleted !!!');
            return res.redirect('back');
        }else{
            req.flash('error','you cannot delete this post!!!');            
            return res.redirect('back');
        }
    }catch(err){
        //console.log(err,'<<-- error while destroying the post...');
        req.flash('error',err);
        return;
    }    
}