import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user_route.js';
import promptRoutes from './routes/prompt_user.js';
import cookieParser from 'cookie-parser';
dotenv.config();


const app = express();
const port  = process.env.PORT || 5000;
const Mongo_URL = process.env.Mongodb_URI;

// middlewares
app.use(express.json());
app.use(cookieParser());
// DB connection

await mongoose.connect(Mongo_URL).then(()=>{
    try{
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log("Error connecting to MongoDB");
    }
})

//  routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/ai", promptRoutes);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
