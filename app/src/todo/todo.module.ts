import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { TodoPrismaRepository } from "./repository/prisma/todo-prisma-repository";
import { UtilsModule } from "utils/utils.module";
import { PrismaService } from "lib/prisma/prisma.service";

@Module({
    imports: [UtilsModule],
    controllers: [TodoController],
    providers: [TodoService, PrismaService, TodoPrismaRepository],
})
export class TodoModule {}
