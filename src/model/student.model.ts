/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import * as Joi from 'joi';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()

export  class Student{
    @Prop({
        required:true
    })
    firstName: string;

    @Prop({
        required:true
    })
    lastName: string;

    @Prop({
        required:true
    })
    email: string;

    @Prop({
        required:true
    })
    userName: string;

    @Prop({
        required:true
    })
    cgpa: number;
}

export const StudentSchema=  SchemaFactory.createForClass(Student);

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
  
