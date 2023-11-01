import { Inject, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Task } from 'src/schemas/task.schema'
import { ConfigService } from '../config-service/config.service'

@Injectable()
export class WorkerService {
    constructor() {
        this.mongoConsumer = this.mongoConsumer.bind(this)
    }
    @InjectModel(Task.name) private model: Model<Task>
    @Inject() private readonly config: ConfigService


    async onModuleInit() {
        await this.mongoConsumer()
    }

    async mongoConsumer() {
        const now = new Date(Date.now())
        const tasks: Task[] | null = await this.model.find({ isDone: false, inProgress: false, nextTryAt: { $lte: now }, attempts: { $gt: this.config.task.maxAttempts } }).sort({ createdAt: 1 })

        if (tasks.length) {
            Logger.log(`Found ${tasks.length} tasks in the queue.`)
        } else {
            Logger.log(`Found ${tasks.length} tasks requests. Sleeping...`)
            setTimeout(await this.mongoConsumer, 3000)
            return
        }

        for (const task of tasks) {
            try {
                task.inProgress = true
                await task.save()

                // Task processing starts.
                Logger.log(task.processPayload)
                // Task processing finishes.

                task.isDone = true
                task.inProgress = false
                await task.save()
            } catch (error: any) {
                console.log(error)
                task.nextTryAt = new Date(Date.now() + 1000 * 60 * 60)
                task.inProgress = false
                task.attempts += 1
                await task.save()
                Logger.error(`Error on processing task, ${task.id}: ${error.message}`)
            }
        }

        setTimeout(await this.mongoConsumer, 100)
    }
}
