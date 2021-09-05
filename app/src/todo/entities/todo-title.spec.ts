import { TodoTitle } from "./todo-title";

describe("TodoTitle", () => {
    describe("constructor", () => {
        it("空文字のときエラー", () => {
            expect(() => {
                new TodoTitle("");
            }).toThrowError("Empty is not allowed.");
        });
    });

    describe("equals メソッド", () => {
        it("等しいとき True を返す", () => {
            const a = new TodoTitle("abc");
            const b = new TodoTitle("abc");

            expect(a.equals(b)).toBeTruthy();
        });

        it("等しくないとき False を返す", () => {
            const a = new TodoTitle("abc");
            const b = new TodoTitle("xyz");

            expect(a.equals(b)).toBeFalsy();
        });
    });

    describe("toString メソッド", () => {
        it("文字列を返す", () => {
            expect(new TodoTitle("abc").toString()).toEqual("abc");
            expect(String(new TodoTitle("abc"))).toEqual("abc");
        });
    });
});
