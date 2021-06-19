/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { StudentController } from '../controller/student/student.controller';
import { StudentSchema} from '../model/student.model';
import { StudentService } from '../services/student.service';

@Module({
    imports:[MongooseModule.forFeature([{name:'Student', schema:StudentSchema}])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
