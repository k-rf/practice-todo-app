import { TodoCompletedDate } from "./todo-completed-date";
import { TodoCreatedDate } from "./todo-created-date";
import { TodoDescription } from "./todo-description";
import { TodoId } from "./todo-id";
import { TODO_STATUS } from "./todo-status";
import { TodoTitle } from "./todo-title";
import { Todo } from "./todo.entity";

describe("Todo", () => {
    describe("done メソッド", () => {
        it("Pending から Done に更新する", () => {
            const todo = new Todo({
                id: new TodoId(),
                title: new TodoTitle("abc"),
                description: new TodoDescription(""),
                createdAt: new TodoCreatedDate(),
            });

            const completedAt = new TodoCompletedDate();
            const doneTodo = todo.done(completedAt);

            expect(doneTodo.status).toEqual(TODO_STATUS.DONE);
            expect(doneTodo.completedAt).toEqual(completedAt);
            expect(todo.status).toEqual(TODO_STATUS.PENDING);
        });

        it("Done から Done に更新する", () => {
            const todo = new Todo({
                id: new TodoId(),
                title: new TodoTitle("abc"),
                description: new TodoDescription(""),
                status: TODO_STATUS.DONE,
                createdAt: new TodoCreatedDate(),
            });

            const completedAt = new TodoCompletedDate();
            const doneTodo = todo.done(completedAt);

            expect(doneTodo.status).toEqual(TODO_STATUS.DONE);
            expect(doneTodo.completedAt).toEqual(completedAt);
            expect(todo.status).toEqual(TODO_STATUS.DONE);
        });
    });

    describe("undone メソッド", () => {
        it("Done から Pending に更新する", () => {
            const todo = new Todo({
                id: new TodoId(),
                title: new TodoTitle("abc"),
                description: new TodoDescription(""),
                status: TODO_STATUS.DONE,
                createdAt: new TodoCreatedDate(),
                completedAt: new TodoCompletedDate(),
            });

            const undoneTodo = todo.undone();

            expect(undoneTodo.status).toEqual(TODO_STATUS.PENDING);
            expect(undoneTodo.completedAt).toBeUndefined();
            expect(todo.status).toEqual(TODO_STATUS.DONE);
        });
        it("Pending から Pending に更新する", () => {
            const todo = new Todo({
                id: new TodoId(),
                title: new TodoTitle("abc"),
                description: new TodoDescription(""),
                createdAt: new TodoCreatedDate(),
            });

            const undoneTodo = todo.undone();

            expect(undoneTodo.status).toEqual(TODO_STATUS.PENDING);
            expect(undoneTodo.completedAt).toBeUndefined();
            expect(todo.status).toEqual(TODO_STATUS.PENDING);
        });
    });
});
