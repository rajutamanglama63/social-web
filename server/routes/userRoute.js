const express = require("express");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary")
const isAuthenticated = require("../middleware/auth");

const User = require("../models/User");
const Post = require("../models/Post");

const router = express.Router();

// follow and unfollow user
router.get("/follow/:id", isAuthenticated, async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if(loggedInUser.followings.includes(userToFollow._id)){
            const followingsIndex = loggedInUser.followings.indexOf(userToFollow._id);
            const followersIndex = userToFollow.followers.indexOf(loggedInUser._id);

            loggedInUser.followings.splice(followingsIndex, 1);
            userToFollow.followers.splice(followersIndex, 1);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({success : true, msg : "User Unfollowed."});
        } else {
            loggedInUser.followings.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({success : true, msg : "User followed."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error.message});
    }
})

// get all post of user whom we have follow. In a simple scentence getting posts from following
router.get("/getPostOfFollowings", isAuthenticated, async (req, res) => {
    try {
        // get loggedIn user
        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            user : {
                // The $in operator selects the documents where the value of a field equals any value in the specified array. 
                $in : user.followings,
            },
        }).populate("user likes comments.user");

        res.status(200).json({success : true, posts : posts.reverse()});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

// get my personal post
router.get("/getMyPosts", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const posts = [];

        for(i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("user likes comments.user");
            
            posts.push(post);
        }

        res.status(200).json({success : true, posts})
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
})

// update password
router.put("/update/password", isAuthenticated, async (req, res) => {
    try {
        // logged in user ---> only loggedin user can update their password
        const user = await User.findById(req.user._id).select("+password");

        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword) {
            return res.status(400).json({success : false, msg : "Please provide old and new password."});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(400).json({success : false, msg : 'Incorrect old password.'});
        }

        const salt = await bcrypt.genSalt(10);

        const hassedNewPassword = await bcrypt.hash(newPassword, salt);

        user.password = hassedNewPassword;

        await user.save();

        res.status(200).json({success : true, msg : "Password updated."});

    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

// update profile
router.put("/update/profile", isAuthenticated, async (req, res) => {
    try {
        // logged in user ---> only loggedin user can update their profile
        const user = await User.findById(req.user._id);

        const {userName, email, firstName, lastName, avatar} = req.body;

        if(userName) {
            user.userName = userName;
        }

        if(email) {
            user.email = email;
        }

        if(firstName) {
            user.firstName = firstName;
        }

        if(lastName) {
            user.lastName = lastName;
        }


        // user avatar : TODO

        // now it's time for pending todo
        if(avatar) {
            await cloudinary.v2.uploader.destroy(user.avatar.publicId);

            const myCloud = await cloudinary.v2.uploader.upload(avatar, {folder : "socialWeb"})

            user.avatar.publicId = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }

        await user.save();

        res.status(200).json({success : true, msg : "Profile updated."});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

// deactivate or delete user
router.delete("/profile/deactivate", isAuthenticated, async (req, res) => {
    try {
        // finding loggedIn user
        const user = await User.findById(req.user._id);

        // getting posts of logged in user
        const posts = user.posts;

        // getting followers of logged in user which is going to be deleted 
        const followers = user.followers;

        // getting followerings of logged in user which is going to be deleted 
        const followings = user.followings;

        // getting id of this particular user or logged in user
        const userId = user._id;

        // this particular code is added after frontend developmet because we have implement image uploading only in frontend part
        // Removing Avatar from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.publicId);

        await user.remove();

        // logged out user automatically after deactivating
        res.cookie("token", null, {expires : new Date(Date.now()), httpOnly : true});

        // delete all post of deactivated user
        for(let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            await post.remove();
        }

        // removing this user who is now deactivated 
        // from list of followers's followings array
        for(let i = 0; i < followers.length; i++) {
            // here we are searching each and every followers of this user who is going to be deactivated or deactivated already above.
            const followerOfThisUserWhoIsDeactivated = await User.findById(followers[i]);

            // now we are going into the follower's following array and removing
            //    this particular user who has been deactivated 
            const index = followerOfThisUserWhoIsDeactivated.followings.indexOf(userId);
            followerOfThisUserWhoIsDeactivated.followings.splice(index, 1);


            await followerOfThisUserWhoIsDeactivated.save();
            
        }


        // removing this user who is now deactivated 
        // from list of followings's followers array
        for(let i = 0; i < followings.length; i++) {
            // here we are searching each and every followings of this user who is going to be deactivated or deactivated already above.
            const followingsOfThisUserWhoIsDeactivated = await User.findById(followings[i]);

            // now we are going into the follower's following array and removing
            //    this particular user who has been deactivated 
            const index = followingsOfThisUserWhoIsDeactivated.followers.indexOf(userId);
            followingsOfThisUserWhoIsDeactivated.followers.splice(index, 1);


            await followingsOfThisUserWhoIsDeactivated.save();
            
        }

        res.status(200).json({success : true, msg : "Profile deactivated"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

// get my profile
router.get("/profile/me", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('posts followers followings');

        res.status(200).json({success : true, user});

    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

// get user by id
router.get("/specific/:id", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts followers followings");
        if(!user) {
            return res.status(404).json({success : false, msg : "User not found."});
        }

        res.status(200).json({success : true, user});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

// get individual user's post
router.get("/userPost/:id", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const posts = [];

        for(let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("likes comments.user user");

            posts.push(post)
        }

        res.status(200).json({
            success: true,
            posts,
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message})
    }
})

// get all user
router.get("/users", isAuthenticated, async (req, res) => {
    try {
        const users = await User.find({
            userName: { $regex: req.query.userName, $options: "i" },
          });

        res.status(200).json({success : true, users});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

// search user
// router.get("/search", isAuthenticated, async (req, res) => {
//     try {
//         const users = await User.find({
//             userName: { $regex: req.query.userName, $options: "i" },
//           });

//         res.status(200).json({success : true, users});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({success : false, msg : error.message});
//     }
// })

module.exports = router;