const {StatusCodes}=require('http-status-codes')
const User=require('../models/User')
const bcrypt=require('bcryptjs')
//login controller//
const login= async (req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const name=req.body.name;
        if (!name || !password || !email) {
            res.send('Please provide valid credentials')
        }
        //generate password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        console.log(hashedPassword);
        
        //create new user
        const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user
        const user = await newUser.save();

       //generate jwt 
        const token=user.createJWT()
        res.status(StatusCodes.CREATED).json({token})
    } catch (error) {
        console.log(error);
    }
    
}

module.exports={
    login}