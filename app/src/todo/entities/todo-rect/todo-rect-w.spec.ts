import { TodoRectW } from "./todo-rect-w";

describe("TodoRectW", () => {
    describe("constructor", () => {
        it("正常に生成される", () => {
            expect(new TodoRectW(3)).toBeDefined();
        });

        it.each([1, 7])("%i のときエラーになる", (value) => {
            expect(() => new TodoRectW(value)).toThrow();
        });
    });
});
