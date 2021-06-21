/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import {  Student } from './student.model';

 @Schema()
 export class Application{

   @Prop({
      type:Student,
      ref:() => Student
   })
    student:Student;

    @Prop({required : true})
    program:string;

    @Prop({required : true})
    semester:string;

    @Prop()
    timestamps:true
 }

export  const ApplicationSchema = SchemaFactory.createForClass(Application);

export  interface Application extends mongoose.Document {
   program:string;
    semester:string,
    student:mongoose.Schema.Types.ObjectId,
    ref:"Student", 
    timestamps:true
}
