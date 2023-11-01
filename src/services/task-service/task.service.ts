import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Task } from "src/schemas/task.schema";

@Injectable()
export class TaskService {
    @InjectModel(Task.name) private model: Model<Task>

    async create(type, payload) {
        try {
            const task = new this.model({
                type,
                processPayload: payload,
            })

            await task.save()

            return {
                success: true,
                taskId: task.id
            }
        } catch (error) {
            return {
                success: false,
                error: error.message
            }
        }
    }
}