/* eslint-disable prettier/prettier */

import { Controller, Post,  Body, Get,Param, Patch, Delete } from "@nestjs/common";
import { ApplicationService } from '../../services/application.service';


@Controller('application')

export class ApplicationController {
    
    constructor( 
                private  applicationService : ApplicationService,
        ){}
  
    
 @Post()
     async create(
        @Body('program')applicationProgam:string,
        @Body('semester')aSemester:string,
        @Body('studentId') student:string,
        ) {
       const  genId=  await this.applicationService.insertApplication(
        student,
        applicationProgam,
        aSemester
        );
       return genId;
    }
       
@Get()
 async find(){
    const applications = await this.applicationService.getApplications();
    return applications;

};

@Get(':id')
getById(@Param('id') studeId: string,){
    return this.applicationService.getOneApplicaiton(studeId);

}

@Patch(':id')
    async update(
        @Param('id') ApplicationId: string,
        @Body('program') ApplicationProgram:string,
        @Body('semester') ApplicationSemester:string,
            ){
                await this.applicationService.updateApplication(
                    ApplicationId,
                    ApplicationProgram,
                    ApplicationSemester,
                    )
                return('update succcessful');
            }

@Delete(':id')
    async removeProduct(@Param('id') studentId: string){
         await  this.applicationService.deleteApplication(studentId);
          return('product deleted');
     }
}