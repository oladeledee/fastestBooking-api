import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './module/application.modules';
import { StudentModule } from './module/student.module';

@Module({
  imports: [
    StudentModule,
    ApplicationModule,
    MongooseModule.forRoot(
      'mongodb+srv://queens:queens@cluster0.zzjbe.mongodb.net/product?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
