import { Body, Controller, Post } from '@nestjs/common'

import { TaskService } from 'src/services/task-service/task.service'
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller()
export class AppController {
  constructor(private readonly service: TaskService) {}

  @Post('/tasks/create')
  async createTask(@Body() body: CreateTaskDto): Promise<any>  {
    return this.service.create('primary-task', body.processPayload);
  }
}
