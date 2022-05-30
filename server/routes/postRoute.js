const express = require("express");
const cloudinary = require("cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

// upload post
router.post("/upload", isAuthenticated, async (req, res) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {folder : "socialWeb"})
        const newPostData = {
            caption : req.body.caption,
            image : {
                publicId : myCloud.public_id,
                url : myCloud.secure_url
            },
            user : req.user._id
        }

        const post = await Post.create(newPostData);

        const user = await User.findById(req.user._id);
        // unshift will add item in first place
        user.posts.unshift(post._id);
        await user.save();

        res.status(200).json({success : "true", msg : "post uploaded successfully", post : post});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error.message});
    }
});

// like and unlike post
router.get("/:id", isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({success : false, msg : "user not found."})
        }

        if(post.likes.includes(req.user._id)) {
            // determining the index of user who like in likes array to use in splice method
            const index = post.likes.indexOf(req.user._id);

            post.likes.splice(index, 1);

            await post.save();

            return res.status(200).json({success : true, msg : "Post unliked."})
        } else {
            post.likes.push(req.user._id);

            await post.save();

            return res.status(200).json({success : true, msg : "Post liked."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error.message});
    }
});

// delete post
router.delete("/delete/:id", isAuthenticated, async (req, res) => {
    const post = await Post.findById(req.params.id);

    if(!post) {
        return res.status(404).json({success : false, msg : "Post not found."});
    };

    if(post.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({success : false, msg : "Unauthorized."});
    };

    await cloudinary.v2.uploader.destroy(post.image.publicId);

    await post.remove();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);

    user.posts.splice(index, 1);

    user.save();

    res.status(200).json({ success : true, msg : "Post deleted." });
});

// update post
router.put("/update/caption/:id", isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({success : false, msg : "Post not found."});
        }

        if(post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({success : false, msg : "Unauthorized."});
        }

        post.caption = req.body.caption;
        await post.save();

        res.status(200).json({success : true, msg : "Post updated."});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

// add or update comment on post
router.put("/comment/:id", isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({success : false, msg : "Post not found"});
        }

        // initializing index of comment in comment array of post
        let indexOfComment = -1;

        // checking if logged in user has already commented or not by 
        // detecting his/her comment in comment array of post and after this
        // it will locate that comment and assign to index
        post.comments.forEach((commentItem, index) => {
            if(commentItem.user.toString() === req.user._id.toString()) {
                indexOfComment = index;
            }
        });
        

        if(indexOfComment !== -1) {
            post.comments[indexOfComment].comment = req.body.comment;

            await post.save();

            res.status(200).json({success : true, msg : "Comment updated."});
        } else {
            post.comments.push({
                user : req.user._id,
                comment : req.body.comment,
            });
            await post.save();
            res.status(200).json({success : true, msg : "Comment added."});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});



// delete comment
// there are 2 situation when it comes about deleting comment
// 1. logged in user or owner of post can delete each and every comment of it's post
// 2. any user can delete his/her comment in other's post but he/she can not delete comment of other user
router.delete("/delete/comment/:id", isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(400).json({success : false, msg : "Post not found."});
        }

        // here we are applying logic for first situation
        if(post.user.toString() === req.user._id.toString()) {

            if(req.body.commentId === undefined) {
                return res.status(400).json({success : false, msg : "comment id is required."});
            }
            post.comments.forEach((commentItem, index) => {
                // with this condition we can find index of comment which is commented by current logged in user because here we have use forEach loop
                if(commentItem._id.toString() === req.body.commentId.toString()) {
                    // because of forEach loop it will iterate over and over again even it find it's index. Thats why return key word in needed here to terminate after it has found it's index
                    return post.comments.splice(index, 1);
                }

            })

            await post.save();

            return res.status(200).json({success : true, msg : "Selected comment has deleted."})

        } else {
            // here we are applying logic for second situation
            post.comments.forEach((commentItem, index) => {
                // with this condition we can find index of comment which is commented by current logged in user because here we have use forEach loop
                if(commentItem.user.toString() === req.user._id) {
                    // because of forEach loop it will iterate over and over again even it find it's index. Thats why return key word in needed here to terminate after it has found it's index
                    return post.comments.splice(index, 1);
                }
            });

            await post.save();

            res.status(200).json({success : true, msg : "Your comment has deleted."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, msg : error.message});
    }
});

module.exports = router;