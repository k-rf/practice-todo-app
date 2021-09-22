import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.origin ?? "http://localhost:8080",
        allowedHeaders: "*",
    });

    await app.listen(3000);
}
bootstrap();
