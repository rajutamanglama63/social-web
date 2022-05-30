const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    avatar : {
        publicId : String,
        url : String
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post"
        }
    ],
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
    ],
    followings : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
    ],
    isAdmin : {
        type : Boolean,
        default : false
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
}, {timestamps : true});

userSchema.methods.getResetPasswordToken = function () {
    // generating encripted token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // saving generated token in database by implying more encryption
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // expring token in 10 minutes
    this.resetPasswordExpire = Date.now() + 20 * 60 * 1000;

    // we are returning first generated token not updated token which we have save in DB
    return resetToken;
}

const User = mongoose.model("user", userSchema);


module.exports = User;