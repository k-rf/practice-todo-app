import { Injectable } from "@nestjs/common";
import { UUID } from "utils/uuid";
import { UUIDGenerator } from "utils/uuid-generator";
import { CreateTodoDto } from "./dto/create-todo.dto";
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

    complete(id: string) {
        return id;
    }

    incomplete(id: string) {
        return id;
    }

    findAll() {
        return this.repository.value.map((todo) => ({
            id: String(todo.id),
            title: String(todo.title),
            description: String(todo.description),
            createdAt: todo.createdAt,
        }));
    }

    findOne(id: number) {
        return `This action returns a #${id} todo`;
    }

    async remove(id: UUID) {
        await this.repository.remove(new TodoId(id));
    }
}
