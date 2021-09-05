import { TodoDescription } from "./todo-description";

describe("TodoDescription", () => {
    describe("equals メソッド", () => {
        it("等しいとき True を返す", () => {
            const a = new TodoDescription("abc");
            const b = new TodoDescription("abc");

            expect(a.equals(b)).toBeTruthy();
        });

        it("等しくないとき False を返す", () => {
            const a = new TodoDescription("abc");
            const b = new TodoDescription("xyz");

            expect(a.equals(b)).toBeFalsy();
        });
    });

    describe("toString メソッド", () => {
        it("文字列を返す", () => {
            expect(new TodoDescription("abc").toString()).toEqual("abc");
            expect(String(new TodoDescription("abc"))).toEqual("abc");
        });
    });
});
