import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as Yup from 'yup'

@Injectable()
export class ConfigService {
    app: {
        port: number
        cors: {
            origin?: string[]
        }
        env: string
    }
    mongo: {
        uri: string
        database: string
    }
    task: {
        maxAttempts: number
    }

    constructor() {
        ConfigService.loadFromEnvFile()
        const vars = Object.assign({}, process.env) as any
        try {
            this.registerApp(vars)
            this.registerMongo(vars)
            this.registerTask(vars)
        } catch (error) {
            throw new Error(`Config validation error: ${error.message}`)
        }
    }

    private static loadFromEnvFile() {
        if (process.env.ENV === 'test') {
            dotenv.config({ path: '.env.test' })
            return
        }
        dotenv.config()
    }

    private registerApp(vars: { [varName: string]: any }) {
        const appSchema = Yup.object().shape({
            ENV: Yup.string().oneOf(['development', 'test', 'production']).default('production'),
            APP_PORT: Yup.number().default(3000),
            APP_CORS_ORIGIN: Yup.string().optional(),
        })
        const config = appSchema.validateSync(vars, { stripUnknown: true })
        this.app = {
            port: config.APP_PORT,
            cors: {
                origin: config.APP_CORS_ORIGIN === '' ? undefined : config.APP_CORS_ORIGIN?.split(','),
            },
            env: config.ENV
        }
    }

    private registerMongo(vars: { [varName: string]: any }) {
        const appSchema = Yup.object().shape({
            MONGO_URI: Yup.string().required(),
            MONGO_DATABASE: Yup.string().required(),
        })

        const config = appSchema.validateSync(vars, { stripUnknown: true })

        this.mongo = {
            uri: config.MONGO_URI,
            database: config.MONGO_DATABASE,
        }
    }

    private registerTask(vars: { [varName: string]: any }) {
        const appSchema = Yup.object().shape({
            TASK_MAX_ATTEMPT: Yup.number().required(),
        })

        const config = appSchema.validateSync(vars, { stripUnknown: true })

        this.task = {
            maxAttempts: config.TASK_MAX_ATTEMPT,
        }
    }
}