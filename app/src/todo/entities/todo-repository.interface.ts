import { TodoId } from "./todo-id";
import { Todo } from "./todo.entity";

export interface TodoRepository {
    save(value: Todo): Promise<void>;
    remove(value: TodoId): Promise<void>;
}
