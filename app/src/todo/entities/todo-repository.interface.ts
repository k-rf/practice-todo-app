import { TodoId } from "./todo-id";
import { Todo } from "./todo.entity";

export interface TodoRepository {
    count(): Promise<number>;
    findOne(value: TodoId): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    save(value: Todo): Promise<void>;
    remove(value: TodoId): Promise<void>;
}
