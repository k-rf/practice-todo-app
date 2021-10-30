import { TodoRectH } from "./todo-rect-h";

describe("TodoRectH", () => {
    describe("constructor", () => {
        it("正常に生成される", () => {
            expect(new TodoRectH(3)).toBeDefined();
        });

        it.each([1, 7])("%i のときエラーになる", (value) => {
            expect(() => new TodoRectH(value)).toThrow();
        });
    });
});
