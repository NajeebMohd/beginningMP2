const express = require('express');
const Posts = require('../models/post.js');
const User = require('../models/user');

// module.exports.home = function(req,res){
//     // console.log(req.cookies);
//     // res.cookie('user_id',33);
//     // Posts.find({},function(err,posts){
//     //     return res.render('home',{
//     //         title : "codieal | home page",
//     //         posts : posts
//     //     });
//     // });
//     //console.log('home controller started...');   
    
//     Posts.find({})
//     .populate('user')// in the Posts Schema we have used user
//     .populate({
//         path : 'comments',
//         populate: {
//             path : 'user'// in the schema we have used the name as user
//         }
//     })
//     .exec(function(err,posts){
//         User.find({},function(err,users){
//             return res.render('home',{
//                 title : "codieal | home page",
//                 posts : posts,
//                 all_users : users           
//             });
//         });
        
//     });
    
// }


module.exports.home = async function(req,res){  
    try{
        let posts = await Posts.find({})
        .populate('user')
        .populate({
            path : 'comments',
            populate: {
                path : 'user'
            }
        });
        let users = await User.find({});   
        return res.render('home',{
            title : "codieal | home page",
            posts : posts,
            all_users : users           
        });
    }catch(err){
        console.log(err,'<<-- error in the home controller...');
    }// compare this funtion with above commented function to have an idea
     
}