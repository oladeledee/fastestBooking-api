/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { StudentController } from 'src/controller/student/student.controller';
import { StudentSchema } from 'src/model/student.model';
import { StudentModule } from 'src/module/student.module';
import { StudentService } from 'src/services/student.service';
import { ApplicationController } from '../controller/application/application.controller'
import { ApplicationSchema} from  '../model/application.model'

import { ApplicationService } from '../services/application.service';

@Module({
    imports:[
            StudentModule,
            ApplicationModule,
            MongooseModule.forRoot(
              'mongodb+srv://queens:queens@cluster0.zzjbe.mongodb.net/product?retryWrites=true&w=majority',
            ),
           MongooseModule.forFeature([{name:'Student', schema:StudentSchema}]),
        MongooseModule.forFeature([{name:'Application', schema:ApplicationSchema}]),
],
    
  controllers: [ApplicationController,StudentController],
  providers: [ApplicationService,StudentService],
})

@Module({

})
export class ApplicationModule {}
