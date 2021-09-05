import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./todo/todo.module";
import { UtilsModule } from "./utils/utils.module";

@Module({
    imports: [TodoModule, UtilsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
