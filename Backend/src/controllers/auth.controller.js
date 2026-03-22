const userModel= require("../models/user.model")
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")
const blacklistModel= require("../models/blacklist.model")

async function registerusercontroller(req,res){
    try {
        const {username,email,password}= req.body;

        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

    const isusernameexist= await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })
    if(isusernameexist){
        return res.status(400).json({message:"Username already exists"})
    }

    const hash = await bcrypt.hash(password,10)

    const user= await userModel.create({
        username,email,password:hash
    })
    const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

        res.status(201).json({message:"User registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email}
        })
    } catch (error) {
        console.error("❌ Registration error:", error.message)
        res.status(500).json({message:"Registration failed", error: error.message})
    }
}


async function loginusercontroller(req,res){
    try {
        const{email,password}= req.body;

        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"})
        }

        const user= await userModel.findOne({email:email})

        if(!user){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const isPasswordmatch= await bcrypt.compare(password,user.password)

        if(!isPasswordmatch){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

        res.cookie("token",token, {httpOnly: true, sameSite: "lax",secure:false})
        res.status(200).json({message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
        token
    })
    } catch (error) {
        console.error("❌ Login error:", error.message)
        res.status(500).json({message:"Login failed", error: error.message})
    }
}

async function logoutusercontroller(req,res){
    try {
        const token = req.cookies.token
        if(!token){
           await blacklistModel.create({token})
        }
        res.clearCookie("token")
        res.status(200).json({message:"User logged out successfully"})
    } catch (error) {
        console.error("❌ Logout error:", error.message)
        res.status(500).json({message:"Logout failed", error: error.message})
    }
}

async function getMeController(req,res){
    try {
        const user = await userModel.findById(req.user.id)
        
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        
        res.status(200).json({
            message:"User details fetched successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    } catch (error) {
        console.error("❌ GetMe error:", error.message)
        res.status(500).json({message:"Failed to fetch user details", error: error.message})
    }
}


module.exports= { 
    registerusercontroller, 
    loginusercontroller , 
    logoutusercontroller,
    getMeController};