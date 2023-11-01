import {INestApplication, ValidationPipe} from '@nestjs/common'

export function applyGlobalPipes(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
}