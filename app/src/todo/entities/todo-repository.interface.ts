import { TodoId } from "./todo-id";
import { Todo } from "./todo.entity";

export interface TodoRepository {
    save(value: Todo): Promise<void>;
    findOne(value: TodoId): Promise<Todo>;
    remove(value: TodoId): Promise<void>;
}
