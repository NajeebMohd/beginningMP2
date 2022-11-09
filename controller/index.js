const express = require('express');


module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',33);
    console.log('home controller started...');    
    return res.render('home',{
        title : "home page."
    });
}

