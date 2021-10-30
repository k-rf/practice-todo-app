import { TodoRectY } from "./todo-rect-y";

describe("TodoRectY", () => {
    describe("constructor", () => {
        it("正常に生成される", () => {
            expect(new TodoRectY(3)).toBeDefined();
        });

        it.each([-1])("%i のときエラーになる", (value) => {
            expect(() => new TodoRectY(value)).toThrow();
        });
    });
});
