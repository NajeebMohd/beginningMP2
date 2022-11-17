const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type : String,
        required : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //include array of id's of all comments in this posts Schema itself
    comment: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;