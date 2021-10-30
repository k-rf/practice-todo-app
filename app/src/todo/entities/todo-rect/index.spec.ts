import { TodoRect } from ".";
import { TodoRectH } from "./todo-rect-h";
import { TodoRectW } from "./todo-rect-w";
import { TodoRectX } from "./todo-rect-x";
import { TodoRectY } from "./todo-rect-y";

describe("TodoLayout", () => {
    describe("constructor", () => {
        it("正しく生成される", () => {
            expect(
                new TodoRect({
                    x: new TodoRectX(1),
                    y: new TodoRectY(1),
                    w: new TodoRectW(3),
                    h: new TodoRectH(3),
                }),
            ).toBeDefined();
        });
    });
});
