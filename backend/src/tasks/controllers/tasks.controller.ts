import { Controller, Headers, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('api/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getAllTasks(@Headers() headers) {
      const title = headers['title'];
      const id = headers['id'];
      const startDate = headers['start-date'] ? new Date(headers['start-date']) : undefined;
      const endDate = headers['end-date'] ? new Date(headers['end-date']) : undefined;
    
      return this.tasksService.findFiltered(id, title, startDate, endDate);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Put(':id')
    updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number) {
        return this.tasksService.remove(id);
    }
}

@Controller('api/tags')
export class TagsController {
    constructor(private readonly tasksService: TasksService) { }
    @Get()
    getTags() {
        return this.tasksService.getDistinctTags();
    }
}
