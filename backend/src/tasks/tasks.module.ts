import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController, TagsController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { Task } from './models/task.model';
import { ErrorHandlerService } from './services/errorHandler.service';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  controllers: [TasksController, TagsController],
  providers: [TasksService, ErrorHandlerService],
})
export class TasksModule {}
