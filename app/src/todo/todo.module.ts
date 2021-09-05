import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { TodoInMemoryRepository } from "./repository/in-memory/todo-in-memory-repository";
import { UtilsModule } from "utils/utils.module";

@Module({
    imports: [UtilsModule],
    controllers: [TodoController],
    providers: [TodoService, TodoInMemoryRepository],
})
export class TodoModule {}
