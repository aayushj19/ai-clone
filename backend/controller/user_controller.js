import User from "../model/user_model.js";
import bcrpypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signup = async(req, res) => {
    const {firstName, lastName, email, password} = req.body
    try{
        const user = await User.findOne({email:email})
        if(user){
            return res.status(401).json({message:"User already exists"})
        }
        const hashedPassword = await bcrpypt.hash(password, 10)
       
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()
        return res.status(201).json({message:"User created successfully",id:savedUser._id})
    }
    catch(err){
        console.log(err);
    }


};


export const login = async(req, res) => {
    const {email, password} = req.body;
    const user_email = await User.findOne({email:email});
    const passwordMatch = await bcrpypt.compare(password, user_email.password);
 
    const user = await User.findOne({email:email});
    try{
    if(!user || !passwordMatch){
        return res.status(401).json({message:"Invalid email or password"})
    }
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "Strict"
    }
    res.cookie("jwt",token, cookieOptions);
    return res.status(200).json({message:"Login successful",id:user._id,jwt_token:token})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
};

export const logout = (req, res) => { 
    try{
        res.clearCookie("jwt");
        return res.status(200).json({message:"Logout successful"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }

}
