import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "lib/prisma/prisma.service";
import { TodoCompletedDate } from "todo/entities/todo-completed-date";
import { TodoId } from "todo/entities/todo-id";
import { Todo } from "todo/entities/todo.entity";
import { TodoPrismaRepository } from "./todo-prisma-repository";

describe("TodoInMemoryRepository", () => {
    let repository: TodoPrismaRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [PrismaService, TodoPrismaRepository],
        }).compile();

        repository = moduleFixture.get(TodoPrismaRepository);

        const service = moduleFixture.get(PrismaService);
        await service.cleanUp();
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

            return expect(repository.findOne(todo.id)).resolves.toEqual(todo);
        });

        it("同じ ID を持つ TODO が存在する場合、その TODO を上書きする", async () => {
            const todo = Todo.of();

            await repository.save(todo);

            await expect(repository.findOne(todo.id)).resolves.toEqual(todo);
            await expect(repository.count()).resolves.toEqual(1);

            const doneTodo = todo.done(new TodoCompletedDate());
            await repository.save(doneTodo);

            await expect(repository.findOne(todo.id)).resolves.toEqual(
                doneTodo,
            );
            await expect(repository.count()).resolves.toEqual(1);
        });
    });

    describe("remove メソッド", () => {
        it("TODO を削除する", async () => {
            const id = new TodoId();
            const todo = Todo.of({ id });

            await repository.save(todo);
            await repository.remove(id);

            await expect(repository.count()).resolves.toEqual(0);
        });

        it("指定した ID が存在しない場合エラー", async () => {
            const id = new TodoId();

            expect(repository.remove(id)).rejects.toThrowError(
                `Specified Todo is not existed.`,
            );
        });
    });
});
