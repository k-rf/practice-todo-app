import { Injectable } from "@nestjs/common";
import { DateGenerator } from "utils/date-generator";
import { UUID } from "utils/uuid";
import { UUIDGenerator } from "utils/uuid-generator";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoCompletedDate } from "./entities/todo-completed-date";
import { TodoCreatedDate } from "./entities/todo-created-date";
import { TodoDescription } from "./entities/todo-description";
import { TodoId } from "./entities/todo-id";
import { TodoTitle } from "./entities/todo-title";
import { Todo } from "./entities/todo.entity";
import { TodoInMemoryRepository } from "./repository/in-memory/todo-in-memory-repository";

@Injectable()
export class TodoService {
    constructor(
        private readonly repository: TodoInMemoryRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly dateGenerator: DateGenerator,
    ) {}

    async create(createTodoDto: CreateTodoDto) {
        const id = this.uuidGenerator.generate();

        const todo = new Todo({
            id: new TodoId(id),
            title: new TodoTitle(createTodoDto.title),
            description: new TodoDescription(createTodoDto.description),
            createdAt: new TodoCreatedDate(createTodoDto.createdAt),
        });

        await this.repository.save(todo);

        return id;
    }

    async done(id: UUID) {
        const todo = await this.repository.findOne(new TodoId(id));
        const completedAt = new TodoCompletedDate(
            this.dateGenerator.generate(),
        );

        const doneTodo = todo.done(completedAt);
        await this.repository.save(doneTodo);

        return doneTodo;
    }

    async undone(id: UUID) {
        const todo = await this.repository.findOne(new TodoId(id));

        const undoneTodo = todo.undone();
        await this.repository.save(undoneTodo);

        return undoneTodo;
    }

    findAll() {
        return this.repository.value.map((todo) => ({
            id: String(todo.id),
            title: String(todo.title),
            description: String(todo.description),
            createdAt: todo.createdAt,
        }));
    }

    async findOne(id: UUID) {
        return await this.repository.findOne(new TodoId(id));
    }

    async remove(id: UUID) {
        await this.repository.remove(new TodoId(id));
    }
}
