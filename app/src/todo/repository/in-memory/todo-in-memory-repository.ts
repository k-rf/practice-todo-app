import { TodoId } from "todo/entities/todo-id";
import { TodoRepository } from "todo/entities/todo-repository.interface";
import { Todo } from "todo/entities/todo.entity";
import { InfrastructureException } from "lib/exception/infrastructure.exception";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoInMemoryRepository implements TodoRepository {
    constructor(readonly value: Todo[] = []) {}

    async count() {
        return this.value.length;
    }

    async findOne(value: TodoId) {
        const result = this.value.find((e) => e.id.equals(value));

        if (!result) {
            throw new InfrastructureException(`Specified Todo is not existed.`);
        }

        return result;
    }

    async findAll() {
        return this.value;
    }

    async save(value: Todo) {
        try {
            await this.remove(value.id);
        } catch {
            // no-op
        } finally {
            this.value.push(value);
        }
    }

    async remove(value: TodoId) {
        const index = this.value.findIndex((e) => e.id.equals(value));

        if (index === -1) {
            throw new InfrastructureException(`Specified Todo is not existed.`);
        }

        this.value.splice(index, 1);
    }
}
