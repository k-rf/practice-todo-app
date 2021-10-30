import { TodoRectX } from "./todo-rect-x";

describe("TodoRectX", () => {
    describe("constructor", () => {
        it("正常に生成される", () => {
            expect(new TodoRectX(3)).toBeDefined();
        });

        it.each([-1, 12])("%i のときエラーになる", (value) => {
            expect(() => new TodoRectX(value)).toThrow();
        });
    });
});
