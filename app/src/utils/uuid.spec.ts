import { UUID } from "./uuid";

describe("UUID", () => {
    describe("constructor", () => {
        it("初期値を与えない場合ランダムで生成する", () => {
            expect(new UUID()).toBeDefined();
        });

        it("初期値を与えた場合その値で生成する", () => {
            const id = new UUID();
            expect(new UUID(id)).toEqual(id);
        });
    });

    describe("equals メソッド", () => {
        it("等しいとき True を返す", () => {
            const a = new UUID();
            expect(a.equals(a)).toBeTruthy();
        });

        it("等しくないとき False を返す", () => {
            const a = new UUID();
            const b = new UUID();
            expect(a.equals(b)).toBeFalsy();
        });

        describe("toString メソッド", () => {
            it("文字列を返す", () => {
                const a = new UUID();
                expect(String(a)).toEqual(a.toString());
            });
        });
    });
});
