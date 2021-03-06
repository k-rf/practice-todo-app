import { Injectable } from "@nestjs/common";
import { DateGenerator } from "utils/date-generator";
import { UUID } from "utils/uuid";
import { UUIDGenerator } from "utils/uuid-generator";
import { ChangeTodoLayoutsDto } from "./dto/change-todo-layouts.dto";
import { ChangeTodoStatusDto } from "./dto/change-todo-status.dto";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoDto } from "./dto/todo.output.dto";
import { TodoCompletedDate } from "./entities/todo-completed-date";
import { TodoCreatedDate } from "./entities/todo-created-date";
import { TodoDescription } from "./entities/todo-description";
import { TodoDueDate } from "./entities/todo-due-date";
import { TodoId } from "./entities/todo-id";
import { TodoRect } from "./entities/todo-rect";
import { TodoRectH } from "./entities/todo-rect/todo-rect-h";
import { TodoRectW } from "./entities/todo-rect/todo-rect-w";
import { TodoRectX } from "./entities/todo-rect/todo-rect-x";
import { TodoRectY } from "./entities/todo-rect/todo-rect-y";
import { TodoTitle } from "./entities/todo-title";
import { Todo } from "./entities/todo.entity";
import { TodoPrismaRepository } from "./repository/prisma/todo-prisma-repository";

@Injectable()
export class TodoService {
    constructor(
        private readonly repository: TodoPrismaRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly dateGenerator: DateGenerator,
    ) {}

    async create(createTodoDto: CreateTodoDto) {
        const id = this.uuidGenerator.generate();

        const todo = Todo.of({
            id: new TodoId(id),
            title: new TodoTitle(createTodoDto.title),
            description: new TodoDescription(createTodoDto.description),
            createdAt: new TodoCreatedDate(createTodoDto.createdAt),
            rect: new TodoRect({
                x: new TodoRectX(createTodoDto.x),
                y: new TodoRectY(createTodoDto.y),
                w: new TodoRectW(createTodoDto.w),
                h: new TodoRectH(createTodoDto.h),
            }),
        });

        await this.repository.save(todo);

        return id;
    }

    async changeStatus(changeStatusDto: ChangeTodoStatusDto) {
        const id = new TodoId(changeStatusDto.id);
        const todo = await this.repository.findOne(id);

        const result =
            changeStatusDto.status === "DONE"
                ? todo.done(
                      new TodoCompletedDate(this.dateGenerator.generate()),
                  )
                : todo.undone();

        await this.repository.save(result);

        return TodoDto.of({
            id: String(result.id),
            title: result.title.value,
            description: result.description?.value,
            status: result.status,
            createdAt: result.createdAt,
            completedAt: result.completedAt,
            x: result.rect.x.value,
            y: result.rect.y.value,
            w: result.rect.w.value,
            h: result.rect.h.value,
        });
    }

    async changeLayouts(dto: ChangeTodoLayoutsDto) {
        const todoCollection = dto.todoCollection.map((todo) =>
            Todo.of({
                id: new TodoId(todo.id),
                title: new TodoTitle(todo.title),
                description: todo.description
                    ? new TodoDescription(todo.description)
                    : undefined,
                status: todo.status,
                createdAt: new TodoCreatedDate(todo.createdAt),
                due: todo.due ? new TodoDueDate(todo.due) : undefined,
                completedAt: todo.completedAt
                    ? new TodoCompletedDate(todo.completedAt)
                    : undefined,
                rect: TodoRect.of({
                    x: new TodoRectX(todo.x),
                    y: new TodoRectY(todo.y),
                    w: new TodoRectW(todo.w),
                    h: new TodoRectH(todo.h),
                }),
            }),
        );

        await Promise.all(
            todoCollection.map(
                async (todo) => await this.repository.save(todo),
            ),
        );
    }

    async findAll() {
        return (await this.repository.findAll()).map((todo) =>
            TodoDto.of({
                id: String(todo.id),
                title: String(todo.title),
                description: String(todo.description),
                status: todo.status,
                createdAt: todo.createdAt,
                completedAt: todo.completedAt,
                x: todo.rect.x.value,
                y: todo.rect.y.value,
                w: todo.rect.w.value,
                h: todo.rect.h.value,
            }),
        );
    }

    async findOne(id: UUID) {
        const todo = await this.repository.findOne(new TodoId(id));

        return TodoDto.of({
            id: String(todo.id),
            title: String(todo.title),
            description: String(todo.description),
            status: todo.status,
            createdAt: todo.createdAt,
            completedAt: todo.completedAt,
            x: todo.rect.x.value,
            y: todo.rect.y.value,
            w: todo.rect.w.value,
            h: todo.rect.h.value,
        });
    }

    async remove(id: UUID) {
        await this.repository.remove(new TodoId(id));
    }
}
