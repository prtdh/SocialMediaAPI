const {StatusCodes}=require('http-status-codes')
const Post=require('../models/posts')
const User = require("../models/User");

//create post
const createPost= async (req,res)=>{
    const newPost =new Post(req.body)
     try {
    const savedPost = await newPost.save();
    res.status(StatusCodes.OK).json({postId:savedPost.id,title:savedPost.title,desc:savedPost.desc,createdAt:savedPost.createdAt});
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

//delete post

const deletePost= async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(StatusCodes.OK).json("the post has been deleted");
    } else {
      res.status(StatusCodes.FORBIDDEN).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

//likePost
    const likePost= async (req,res)=>{
        try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      res.status(200).json("You already liked the post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
    }

    //unlikePost
    const unlikePost= async (req,res)=>{
        try {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    } else {
      res.status(200).json("You never liked the post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
    }
    //comment on a post

    const comment= async(req,res)=>{
        try {
            const post=await Post.findById(req.params.id)
                  await post.updateOne({ $push: { comments: req.body.comment } });
                  const indexNum=post.comments.length
                     res.status(200).json(indexNum)

        } catch (error) {
                res.status(500).json(err);

        }
    }

    //get a post

    const getPost=async (req,res)=>{
        try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
    }
    //getAllPostByUser

    const getAllpost=async(req,res)=>{
        try {
            const authUser=await User.findById(req.body.userId);
            const userPosts = await Post.find({});
            const selected=

            res.status(200).json(userPosts);

        } catch (error) {
                res.status(500).json(err);

            
        }
    }



module.exports={createPost,deletePost,likePost,unlikePost,comment,getPost,getAllpost}

