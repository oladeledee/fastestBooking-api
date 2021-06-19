/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import * as Joi from 'joi';

export const StudentSchema = new mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: { type:String, required: true},
    email : { type: String,  required: true, unique:true},
    userName : { type: String,  required: true, unique:true},
    cgpa : { type:Number,  required: true},
})

export  interface Student extends mongoose.Document {
          id:string;
          firstName:string,
          lastName:string;
          email:string;
          userName: string;
          cgpa: number; 
    }

                    
// student validation
export const studentsValidate = 
        Joi.object({
            firstName: Joi.string().min(3).max(255).required(),
            lastName:Joi.string().min(3).max(225).required(),
            userName:Joi.string().min(3).max(30).required(),
            cgpa:Joi.number().required(),
            email:Joi.string().min(5).max(225).email().required(),
        });
  