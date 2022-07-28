const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    caption : {
        type : String
    },
    image : {
        publicId : String,
        url : String
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
    ],
    comments : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "user"
            },
            comment : {
                type : String,
                required : true
            }
        }
    ]
},{
    timestamps : true
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;