import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as 'postgres',  
      host: process.env.DATABASE_HOST,  
      port: process.env.DATABASE_PORT as any,  
      username: process.env.DATABASE_USERNAME,  
      password: process.env.DATABASE_PASSWORD,  
      database: process.env.DATABASE_NAME,  
      autoLoadModels: process.env.AUTO_LOAD_MODELS === 'true',  
      synchronize: process.env.SYNCHRONIZE === 'true',
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
