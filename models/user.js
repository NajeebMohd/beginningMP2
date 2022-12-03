const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userScheme = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    }
},{
    timestamps : true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now());
    }
});

//static methods 
userScheme.statics.uploadedAvatar = multer({storage : storage}).single('avatar');// assigning files to multer and single means only the single file is allowed not the array of files where the array of files is also allowed.
userScheme.statics.avatarPath = AVATAR_PATH;  

const User = mongoose.model('User',userScheme);

module.exports = User;