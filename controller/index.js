const express = require('express');
const Posts = require('../models/post.js');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',33);
    // Posts.find({},function(err,posts){
    //     return res.render('home',{
    //         title : "codieal | home page",
    //         posts : posts
    //     });
    // });
    //console.log('home controller started...');   
    
    Posts.find({})
    .populate('user')// in the Posts Schema we have used user
    .populate({
        path : 'comments',
        populate: {
            path : 'user'// in the schema we have used the name as user
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title : "codieal | home page",
            posts : posts            
        });
    });
    
}