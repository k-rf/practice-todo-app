import { TodoCompletedDate } from "todo/entities/todo-completed-date";
import { TodoId } from "todo/entities/todo-id";
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
            const todo = Todo.of({ id });

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
            const todo = Todo.of();

            await repository.save(todo);

            expect(repository.value[0]).toEqual(todo);
        });

        it("同じ ID を持つ TODO が存在する場合、その TODO を上書きする", async () => {
            const todo = Todo.of();

            await repository.save(todo);

            expect(repository.value[0]).toEqual(todo);
            expect(repository.value.length).toEqual(1);

            const doneTodo = todo.done(new TodoCompletedDate());
            await repository.save(doneTodo);

            expect(repository.value[0]).toEqual(doneTodo);
            expect(repository.value.length).toEqual(1);
        });
    });

    describe("remove メソッド", () => {
        it("TODO を削除する", async () => {
            const id = new TodoId();
            const todo = Todo.of({ id });

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
