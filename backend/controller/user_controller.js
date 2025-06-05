import User from "../model/user_model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signup = async(req, res) => {
    const {firstName, lastName, email, password} = req.body
    try{
        const user = await User.findOne({email:email})
        if(user){
            return res.status(401).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
       
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword
        })
        await newUser.save()
        return res.status(201).json({message:"Signup successful",})
    }
    catch(err){
        console.log("message:Error in Signup: ", err);
        return res.status(500).json({message:"Error in Signup"})
    }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({ errors: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res.cookie("jwt", token, cookieOptions);
    return res
      .status(201)
      .json({ message: "User loggedin succeeded", user, token });
  } catch (error) {
    console.log("Error in login: ", error);
    return res.status(500).json({ errors: "Error in login" });
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
