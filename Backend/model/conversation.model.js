 import mongoose from "mongoose";
 import message from "./message.model.js";
 import User from './user.model.js'



 const consersationschema=new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    messages:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
          default:[]
        }

    ]


 },{
    timestamps:true,
 });

 const consersation=mongoose.model("consersation",consersationschema)
 export default consersation;