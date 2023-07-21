const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//@desc register 
//@route api/users/register
//@access public
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !password || !email){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    //check the user availability
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already existed");
    }
    //hashing the password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed passcode",hashedPassword);

    //creating the user
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
      
    console.log(`User created ${user}`);

    //displaying for the user
    if(user){
        res.status(201).json({ _id: user.id, email:user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }

   // res.json({message:"Reg the user"});
});

//@desc login 
//@route api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
   // res.json({message:"login the user"});
});

//@desc current user 
//@route api/users/current
//@access public
const currentUser = asyncHandler(async(req,res)=>{
    //console.log("in controller",user);
    res.json(req.user);
    //res.json({message:"current user"});
});

//@desc current user 
//@route api/users/current
//@access public
const usersList = asyncHandler(async(req,res)=>{
    const usersList = await User.find();
    //console.log("in controller",user);
    //res.json(req.user);
    res.status(200).json(usersList);
});

module.exports = {registerUser,loginUser,currentUser,usersList};