import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../../../../src/tasks/controllers/tasks.controller';
import { TasksService } from '../../../../src/tasks/services/tasks.service';
import { CreateTaskDto } from '../../../../src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../../../../src/tasks/dto/update-task.dto';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  const mockTasksService = {
    findFiltered: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getDistinctTags: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should call tasksService.findFiltered with the correct parameters', () => {
      const mockHeaders = { title: 'Test Title', id: '1' };
      tasksController.getAllTasks(mockHeaders);
      expect(mockTasksService.findFiltered).toHaveBeenCalledWith(mockHeaders.id, mockHeaders.title);
    });
  });

  describe('createTask', () => {
    it('should call tasksService.create with the correct parameters', () => {
      const createTaskDto: any = { title: 'Test', description: 'Test description', tags: ['tag1'], dueDate: new Date() };
      tasksController.createTask(createTaskDto);
      expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('updateTask', () => {
    it('should call tasksService.update with the correct parameters', () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Title', description: 'Updated description', tags: ['tag1'], dueDate: new Date() };
      tasksController.updateTask(1, updateTaskDto);
      expect(mockTasksService.update).toHaveBeenCalledWith(1, updateTaskDto);
    });
  });

  describe('deleteTask', () => {
    it('should call tasksService.remove with the correct parameters', () => {
      tasksController.deleteTask(1);
      expect(mockTasksService.remove).toHaveBeenCalledWith(1);
    });
  });
});