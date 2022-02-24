const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
var timestamps = require('mongoose-timestamp');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ,unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    followers:{
        type:Array,
        default:[],
    },
    following:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

    
})
userSchema.plugin(timestamps);

userSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id,email:this.email},process.env.jwtSecret,{expiresIn:process.env.jwtLifetime })
}
module.exports=mongoose.model('User',userSchema)
