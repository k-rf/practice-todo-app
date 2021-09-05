import { TodoRepository } from "todo/entities/todo-repository.interface";
import { Todo } from "todo/entities/todo.entity";

export class TodoInMemoryRepository implements TodoRepository {
    constructor(readonly value: Todo[] = []) {}

    async save(value: Todo) {
        this.value.push(value);
    }
}
