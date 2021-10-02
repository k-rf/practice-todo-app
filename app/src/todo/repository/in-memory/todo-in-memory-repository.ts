import { TodoId } from "todo/entities/todo-id";
import { TodoRepository } from "todo/entities/todo-repository.interface";
import { Todo } from "todo/entities/todo.entity";
import { InfrastructureException } from "utils/exception/infrastructure.exception";

export class TodoInMemoryRepository implements TodoRepository {
    constructor(readonly value: Todo[] = []) {}

    async save(value: Todo) {
        this.value.push(value);
    }

    async remove(value: TodoId) {
        const index = this.value.findIndex((e) => e.id.equals(value));

        if (index === -1) {
            throw new InfrastructureException(`Specified Todo is not existed.`);
        }

        this.value.splice(index, 1);
    }
}
