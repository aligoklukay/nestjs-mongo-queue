import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';

import { AppController } from './modules/app/app.controller';
import { ConfigModule } from './services/config-service/config.module';
import { TaskServiceModule } from './services/task-service/task.module';
import { WorkerService } from './services/queue-service/queue-service';
import { ConfigService } from './services/config-service/config.service';

@Module({
  imports: [ConfigModule, TaskServiceModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ uri: config.mongo.uri, dbName: config.mongo.database }),
    }),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
  ])],
  controllers: [AppController],
  providers: [WorkerService],
})
export class AppModule { }
