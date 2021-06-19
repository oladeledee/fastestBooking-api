/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { Application } from '../model/application.model';
import { StudentService} from './student.service';



@Injectable()
export class ApplicationService{
      
   constructor(
       @InjectModel('Application') private ApplicationModel: Model <Application>,
       
       private studentservice: StudentService,
   ) {}

   async insertApplication(
    studentId: string,
    program: string,
    semester: string,
       ){

        const student= await this.studentservice.findStudent(studentId);  
        if(!student) return ('invalid student Id');

         const newApplication =new this.ApplicationModel( {
         program,
         semester,
         student
   } );
    const result= await newApplication.save();
    console.log(result);
   return result.id as string;
 }

 async getApplications(){
     const applications = await this.ApplicationModel.find().populate('student');
     console.log(applications);
       return applications ;
 }
 
async  getOneApplicaiton(applicationId: string){  
   const application =  await this.findApplication(applicationId)
     return {
        program: application.program,
        semester: application.semester,
        student:application.student
     };
 }

 async  updateApplication(
     applicationId:string,
     Program: string,
     Semester:string,     
       )
         {
         const application =  await this.findApplication(applicationId);
         const updatedApplication =application;
               
            if(Program){
                updatedApplication.program=Program;
            }
            if(Semester){
                updatedApplication.semester=Semester;
            }
            return updatedApplication.save();
       }


          async deleteApplication(studeId: string){
              const application = await this.findApplication(studeId);
              if(application){
                  await this.ApplicationModel.deleteOne(application);
              }
              
              return "student details deleted ";
           }

   private  async findApplication(id:string){
    let application
    try {
         application =  await (await this.ApplicationModel.findById(id)).populated('student');
    
    } catch (error) {
        console.error(error.message);
        throw new NotFoundException('Internal server error.');
    }
    if(!application){
        throw new NotFoundException('could not find Application.');
    }
    return application;

}

}
