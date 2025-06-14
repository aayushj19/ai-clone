import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'assistant']
    },
    content :{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});

const Prompt = mongoose.model("Prompt", promptSchema);
export default Prompt;
