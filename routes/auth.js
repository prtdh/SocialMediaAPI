const express=require('express')
const router=express.Router();

const {login,}=require('../controllers/auth')
const {getUser,followUser,unfollowUser}=require('../controllers/users')
const {createPost,deletePost,likePost,unlikePost,getPost,getAllpost,comment}=require('../controllers/posts')
router.route('/authenticate').post(login)
router.route('/user').get(getUser)
router.route('/follow/:id').put(followUser)
router.route('/unfollow/:id').put(unfollowUser)
router.route('/posts').post(createPost)
router.route('/posts/:id').delete(deletePost)
router.route('/like/:id').post(likePost)
router.route('/unlike/:id').post(unlikePost)
router.route('/posts/:id').get(getPost)
router.route('/all_posts').get(getAllpost)
router.route('/comment/:id').post(comment)
module.exports=router