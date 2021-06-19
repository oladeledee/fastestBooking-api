/* eslint-disable prettier/prettier */

import { Controller, Post,  Body, Get,Param, Patch, Delete } from "@nestjs/common";
import { StudentService } from '../../services/student.service';

@Controller('student')

export class StudentController{
    constructor( private studentservice: StudentService){}
    
    @Post()
     async create(
        @Body('firstName')studentfirstName:string,
        @Body('lastName')StudentlastName:string,
        @Body('email')Studentemail: string,
        @Body('userName')StudentuserName: string,
        @Body('cgpa')Studentcgpa: number,
        ) {
       const  genId=  await this.studentservice.insertStudent(
        studentfirstName,
        StudentlastName,
        Studentemail,
        StudentuserName,
        Studentcgpa);
      
       return genId;
    }
       


@Get()
 async find(){

    const students = await this.studentservice.getStudent();

    return students;

};

@Get(':id')
getById(@Param('id') studeId: string,){
    return this.studentservice.getOneStudent(studeId);

}

@Patch(':id')

    async update(
        @Param('id') StudentId: string,
        @Body('firstName')studentfirstName:string,
        @Body('lastName')StudentlastName:string,
        @Body('email')Studentemail: string,
        @Body('userName')StudentuserName: string,
        @Body('cgpa')Studentcgpa: number,
            ){
                await this.studentservice.updateStudent(
                    StudentId,
                    studentfirstName,
                    StudentlastName,
                    Studentemail,
                    StudentuserName,
                    Studentcgpa
                    )
                return('update succcessful');
            }

@Delete(':id')

    async removeProduct(@Param('id') studentId: string){
         await  this.studentservice.deleteStudent(studentId);
          return('product deleted');

     }
}