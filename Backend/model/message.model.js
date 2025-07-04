import mongoose from "mongoose";


const messageschema=new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
     receiverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    message:{
        type:String,
        required:true,
      

    }


},{
    timestamps:true
});

const message=mongoose.model("message",messageschema);
export default message;