import { Todo } from "./todo.entity";

export interface TodoRepository {
    save(value: Todo): Promise<void>;
}
