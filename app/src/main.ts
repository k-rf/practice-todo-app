import { NestFactory } from "@nestjs/core";
import { PrismaService } from "lib/prisma/prisma.service";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ["log"],
    });

    app.enableCors({
        origin: process.env.origin ?? "http://localhost:8080",
        allowedHeaders: "*",
    });

    const prismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);

    await app.listen(3000);
}
bootstrap();
