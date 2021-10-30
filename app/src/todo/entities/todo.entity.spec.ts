import { TodoCompletedDate } from "./todo-completed-date";
import { TODO_STATUS } from "./todo-status";
import { Todo } from "./todo.entity";

describe("Todo", () => {
    describe("done メソッド", () => {
        it("Pending から Done に更新する", () => {
            const todo = Todo.of();

            const completedAt = new TodoCompletedDate();
            const doneTodo = todo.done(completedAt);

            expect(doneTodo.status).toEqual(TODO_STATUS.DONE);
            expect(doneTodo.completedAt).toEqual(completedAt);
            expect(todo.status).toEqual(TODO_STATUS.PENDING);
        });

        it("Done から Done に更新する", () => {
            const todo = Todo.of({
                status: TODO_STATUS.DONE,
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
            const todo = Todo.of({
                status: TODO_STATUS.DONE,
            });

            const undoneTodo = todo.undone();

            expect(undoneTodo.status).toEqual(TODO_STATUS.PENDING);
            expect(undoneTodo.completedAt).toBeUndefined();
            expect(todo.status).toEqual(TODO_STATUS.DONE);
        });

        it("Pending から Pending に更新する", () => {
            const todo = Todo.of();

            const undoneTodo = todo.undone();

            expect(undoneTodo.status).toEqual(TODO_STATUS.PENDING);
            expect(undoneTodo.completedAt).toBeUndefined();
            expect(todo.status).toEqual(TODO_STATUS.PENDING);
        });
    });
});
