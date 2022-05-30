const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const crypto = require("crypto");

const User = require("../models/User");
const { sendEmail } = require("../middleware/sendEmail");

const router = express.Router();

dotenv.config();

router.post("/register", async (req, res) => {
    try {
        const { userName, email, password, firstName, lastName, avatar } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {folder : "socialWeb"})

        if(!userName || !email || !password) {
            res.status(400).json({msg : "All field required!"});
        };

        const user = await User.findOne({email : email});
        if(user) {
            res.status(200).json({msg : "User Already exist!"});
        }

        const salt = await bcrypt.genSalt(10);

        const hassedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName : userName,
            email : email,
            password : hassedPassword,
            lastName : lastName,
            firstName : firstName,
            avatar : {
                publicId : myCloud.public_id,
                url : myCloud.secure_url
            }
        });

        await newUser.save();

        // signing jwt token for authentication
        const token = generateToken({_id : newUser._id, userName : newUser.userName, email : newUser.email, firstName : newUser.firstName, lastName : newUser.lastName, avatar : newUser.avatar, isAdmin : newUser.isAdmin});
        
        const options = {
            expires : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly : true,
        }

        res.status(200).cookie("token", token, options).json({ success : true, newUser, token});
    } catch (error) {
        // console.log(error);
        res.status(500).json({msg : error.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400).json({msg : "All field are required."});
        }

        const existingUser = await User.findOne({email : email});
        if(!existingUser) {
            res.status(400).json({msg : "User does not exist."});
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            res.status(400).json({msg : "Invalid Credentials"});
        }

        const token = generateToken({_id : existingUser._id, userName : existingUser.userName, avatar : existingUser.avatar, email : existingUser.email, firstName : existingUser.firstName, lastName : existingUser.lastName, followers : existingUser.followers, followings : existingUser.followings, posts : existingUser.posts});
        
        const options = {
            expires : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly : true
        }

        res.status(200).cookie("token", token,  options).json({ success : true, existingUser, token});

    } catch (error) {
        // console.log(error);
        res.status(500).json({msg : error.message});
    }
});

// logout
router.get("/logout", async (req, res) => {
    try {
        res.status(200).cookie("token", null, {expires : new Date(Date.now()), httpOnly : true}).json({success : true, msg : "logged out"});
    } catch (error) {
        // console.log(erorr);
        res.status(500).json({success : false, msg : error.message});
    }
});

// forget password
router.post("/forget/Password", async (req, res) => {
    try {
       const user = await User.findOne({email : req.body.email});
       if(!user) {
           return res.status(401).json({success : false, msg : "User not found."});
       } 

       const resetPasswordToken = user.getResetPasswordToken();

       await user.save();

       const urlForReset = `${req.protocol}://${req.get("host")}/auth/password/reset/${resetPasswordToken}`;
       console.log(urlForReset)
       const message = `Reset your password by clicking the link below: \n\n ${urlForReset}`;

       try {
        //    await sendEmail({
        //        email : user.email,
        //        subject : "Reset password",
        //        message,
        //    });

        //    res.status(200).json({success : true, msg : `Message sent to ${user.email}`});

        res.status(200).json({success : true, msg : message});
       } catch (error) {
        // when there is error occur in sending email then there will be no use of resetPasswordToken and resetPasswordExpire in DB which we have already saved. so we are undefining it.
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(500).json({success : false, msg : error.message});
       }
    } catch (error) {
        // console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

// now reset password
router.put("/password/reset/:token", async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({resetPasswordToken : resetPasswordToken, resetPasswordExpire : { $gt : Date.now()}})

        if(!user) {
            return res.status(401).json({success : false, msg : "Token is invalid or has expired."});
        }

        const salt = await bcrypt.genSalt(10);

        const hassedNewPassword = await bcrypt.hash(req.body.password, salt);

        // resetting password
        user.password = hassedNewPassword;

        // undefining resetpasswordtoken and resetPasswordExpire from DB since it is not required after password has reset
        // because these two fields in userSchema later in DB is only for comparing token.
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({success : true, msg : "Password reset successfully."});
    } catch (error) {
        // console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});



const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn : "1d"});
} 

module.exports = router;