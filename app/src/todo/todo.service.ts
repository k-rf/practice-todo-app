import { Injectable } from "@nestjs/common";
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
        return `This action returns all todo`;
    }

    findOne(id: number) {
        return `This action returns a #${id} todo`;
    }

    remove(id: number) {
        return `This action removes a #${id} todo`;
    }
}
