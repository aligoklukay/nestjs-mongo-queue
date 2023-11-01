import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
    timestamps: true,
    collection: 'tasks',
    strictQuery: false,
})
export class Task extends Document {
    @Prop({ required: true, enum: ['primary-task'], default: 'primary-task' })
    type: 'primary-task'

    @Prop({ default: false })
    inProgress: boolean

    @Prop({ default: false })
    isDone: boolean

    @Prop()
    attempts: number

    @Prop()
    error: string | null

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date

    @Prop()
    startedAt: Date

    @Prop()
    finishedAt: Date

    // This element will be processed for general purpose of the queue.
    @Prop()
    processPayload: string

    @Prop({ type: Date, default: Date.now })
    nextTryAt: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)