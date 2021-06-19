/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';



 export const ApplicationSchema = new mongoose.Schema({
    student:
           {  type:mongoose.Schema.Types.ObjectId,
        ref:"Student",    
           } ,
    program: {
          type:String,
          required:true
         },
    semester:{
        type:String,
        required:true
        },  
},
     {timestamps:true}
)

export  interface Application extends mongoose.Document {
   program:string;
    semester:string,
    student:mongoose.Schema.Types.ObjectId,
    ref:"Student", 
    timestamps:true
}