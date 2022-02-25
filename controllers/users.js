const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')


//get a user
const getUser= async (req,res)=>{
try {
    const user= await User.findOne({email:req.body.email})
    res.status(StatusCodes.OK).json({name:user.name,followers:user.followers.length,following:user.following.length})

    console.log(user);
} catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({msg:'Please try again'})
}
}
//follow a user

const followUser=async (req,res)=>{

    if (req.body.userId !==req.params.id) {
        try {
            const user=await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{following:req.params.id}})
                res.status(StatusCodes.OK).json('User has been followed')
            }
            else{
                res.status(403).json('You already follow this user')
            }
            
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json(error)
        }
    }
    else{
        res.status(StatusCodes.FORBIDDEN).json("You can't follow yourself")
    }
}

//unfollow a user

const unfollowUser=async (req,res)=>{

    if (req.body.userId !==req.params.id) {
        try {
            const user=await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{following:req.params.id}})
                res.status(StatusCodes.OK).json('User has been unfollowed')
            }
            else{
                res.status(403).json('You dont follow this user')
            }
            
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json(error)
        }
    }
    else{
        res.status(StatusCodes.FORBIDDEN).json("You can't unfollow yourself")
    }
}


module.exports={getUser,followUser,unfollowUser}