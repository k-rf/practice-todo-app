import { TodoCreatedDate } from "todo/entities/todo-created-date";
import { TodoDescription } from "todo/entities/todo-description";
import { TodoId } from "todo/entities/todo-id";
import { TodoTitle } from "todo/entities/todo-title";
import { Todo } from "todo/entities/todo.entity";
import { TodoInMemoryRepository } from "./todo-in-memory-repository";

describe("TodoInMemoryRepository", () => {
    let repository: TodoInMemoryRepository;

    beforeEach(() => {
        repository = new TodoInMemoryRepository();
    });
    it("should be defined", () => {
        expect(new TodoInMemoryRepository()).toBeDefined();
    });

    describe("findOne メソッド", () => {
        it("TODO を 1 件取得する", async () => {
            const id = new TodoId();

            const todo = new Todo({
                id,
                title: new TodoTitle("abc"),
                description: new TodoDescription(""),
                createdAt: new TodoCreatedDate(),
            });

            await repository.save(todo);
            const result = await repository.findOne(id);

            expect(result.id).toEqual(id);
        });

        it("指定した ID が存在しない場合エラー", async () => {
            const id = new TodoId();

            expect(repository.findOne(id)).rejects.toThrowError(
                `Specified Todo is not existed.`,
            );
        });
    });

    describe("save メソッド", () => {
        it("TODO を保存する", async () => {
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

    describe("remove メソッド", () => {
        it("TODO を削除する", async () => {
            const id = new TodoId();

            const todo = new Todo({
                id,
                title: new TodoTitle("abc"),
                description: new TodoDescription(""),
                createdAt: new TodoCreatedDate(),
            });

            await repository.save(todo);
            await repository.remove(id);

            expect(repository.value.length).toEqual(0);
        });

        it("指定した ID が存在しない場合エラー", async () => {
            const id = new TodoId();

            expect(repository.remove(id)).rejects.toThrowError(
                `Specified Todo is not existed.`,
            );
        });
    });
});
