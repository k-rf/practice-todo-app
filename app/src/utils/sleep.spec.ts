import { sleep } from "./sleep";

describe("sleep", () => {
    it("100ms 待つ", async () => {
        const begin = new Date();
        await sleep(100);
        const elapsed = new Date().valueOf() - begin.valueOf();

        expect(elapsed).toBeGreaterThanOrEqual(100);
    });
});
