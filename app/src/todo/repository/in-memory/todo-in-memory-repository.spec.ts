import { TodoCreatedDate } from "todo/entities/todo-created-date";
import { TodoDescription } from "todo/entities/todo-description";
import { TodoId } from "todo/entities/todo-id";
import { TodoTitle } from "todo/entities/todo-title";
import { Todo } from "todo/entities/todo.entity";
import { TodoInMemoryRepository } from "./todo-in-memory-repository";

describe("TodoInMemoryRepository", () => {
    it("should be defined", () => {
        expect(new TodoInMemoryRepository()).toBeDefined();
    });

    describe("save メソッド", () => {
        it("TODO を保存する", async () => {
            const repository = new TodoInMemoryRepository();
            const todo = new Todo({
                id: new TodoId(),
                title: new TodoTitle("abc"),
                description: new TodoDescription(""),
                createdAt: new TodoCreatedDate(),
            });

            await repository.save(todo);

            expect(repository.value[0]).toEqual(todo);
        });
    });
});
