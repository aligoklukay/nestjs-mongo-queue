import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ConfigModule } from '../config-service/config.module'
import { Task, TaskSchema } from 'src/schemas/task.schema'
import { TaskService } from './task.service'

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ],
    providers: [TaskService],
    exports: [TaskService],
})
export class TaskServiceModule { }