import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Task } from '../models/task.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Op, Sequelize } from 'sequelize';
import { ErrorHandlerService } from './errorHandler.service';  

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly taskModel: typeof Task,
    private readonly errorHandlerService: ErrorHandlerService,  
  ) {}

  private handleError(error: Error) {
    this.errorHandlerService.logError(error.message);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  findFiltered(id: string, title: string, startDate?: Date, endDate?: Date) {
    const where: any = {};

    if (id) {
      where.id = id;
    }
    if (title) {
      where.title = { [Op.like]: `%${title}%` };
    }
    if (startDate && endDate) {
      where.dueDate = {
        [Op.between]: [startDate, endDate],
      };
    } else if (startDate) {
      where.dueDate = {
        [Op.gte]: startDate,
      };
    } else if (endDate) {
      where.dueDate = {
        [Op.lte]: endDate,
      };
    }

    return this.taskModel.findAll({ where }).catch((error) => this.handleError(error));
  }

  create(createTaskDto: CreateTaskDto) {
    const taskData = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: createTaskDto.completed,
      tags: createTaskDto.tags,
      dueDate: createTaskDto.dueDate,
    };

    return this.taskModel.create(taskData as any).catch((error) => this.handleError(error));
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskModel.findByPk(id);
      if (!task) {
        throw new Error('Task not found');
      }
      return task.update(updateTaskDto);
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const task = await this.taskModel.findByPk(id);
      if (!task) {
        throw new Error('Task not found');
      }
      await task.destroy();
      return { message: 'Task deleted successfully' };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getDistinctTags() {
    try {
      const tasks = await this.taskModel.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('tags')), 'tags'],
        ],
      });

      const distinctTags = tasks.map(task => task.get('tags')).flat();
      return [...new Set(distinctTags)];
    } catch (error) {
      this.handleError(error);
    }
  }
}
