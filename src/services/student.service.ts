/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Student} from '../model/student.model';


@Injectable()
export class StudentService{
      
   constructor(
       @InjectModel('Student') private studentModel: Model <Student>,
   ){}

   
   async insertStudent(
       
    firstName:string,
    lastName:string,
    email:string,
    userName: string,
    cgpa: number,
       ){        
            const  student= await this.studentModel.findOne({userName:userName});
            const  studentEmail= await this.studentModel.findOne({email:email});
            if(student){
                throw new HttpException(
                    'userName already exist', 
                    HttpStatus.BAD_REQUEST
                    );            
            }
            if(studentEmail){
                throw new HttpException(
                    'email already exist',
                     HttpStatus.BAD_REQUEST);
            }     
            const newStudent =new this.studentModel( {
                firstName:firstName,
                lastName:lastName, 
                email:email,
                userName:userName,
                cgpa:cgpa,
          } );
           const result= await newStudent.save();
           console.log(result);
          return result.id as string;
            
        } 
         
 

 async getStudent(){
     const students = await this.studentModel.find();
     console.log(students);
     return students.map(stude =>({
         id:stude.id,
         firstName:stude.firstName,
         lastName:stude.lastName, 
         email:stude.email,
         userName:stude.userName,
         cgpa:stude.cgpa,
     })
     ) ;
 }
 
async  getOneStudent(studentId: string){
   
     
   const student =  await this.findStudent(studentId);
    
     return {
        id:student.id,
         firstName:student.firstName,
         lastName:student.lastName, 
         email:student.email,
         userName:student.userName,
         cgpa:student.cgpa,
     };
 }

 async  updateStudent(
     studentId: string,
     firstName:string,
     lastName:string,
     email:string,
     userName: string,
     cgpa: number, 
       ){
       
         const student =  await this.findStudent(studentId);
         const updatedstudent =student;
               
            if(firstName){
                updatedstudent.firstName=firstName;
            }
            if(lastName){
                updatedstudent.lastName=lastName;
            }
            if(email){
                updatedstudent.email = email;
            }
            if(userName){
                updatedstudent.userName = userName;
            }
            if(cgpa){
                updatedstudent.cgpa = cgpa;
            }
            return updatedstudent.save();
       }


          async deleteStudent(studeId: string){
              const student = await this.findStudent(studeId);
              if(student){
                  await this.studentModel.deleteOne(student);
              }
              
              return "student details deleted ";
           }

        async findStudent(id:string){
     let student
     try {
          student =  await this.studentModel.findById(id);
     
     } catch (error) {
        console.error(error.message);
        throw new NotFoundException('Internal server error.');
     }
     if(!student){
         throw new NotFoundException('could not find student with the given the id.');
     }
     return student;
 }
}