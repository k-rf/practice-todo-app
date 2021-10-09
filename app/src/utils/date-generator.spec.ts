import { DateGenerator } from "./date-generator";
import { sleep } from "./sleep";

describe("DateGenerator", () => {
    let dateGenerator: DateGenerator;

    beforeEach(() => {
        dateGenerator = new DateGenerator();
    });

    it("should be defined", () => {
        expect(new DateGenerator()).toBeDefined();
    });

    describe("generate メソッド", () => {
        it("UUID を生成する", () => {
            expect(dateGenerator.generate()).toBeDefined();
        });
    });

    describe("lastGenerated メソッド", () => {
        it("最後に生成した UUID を返す", async () => {
            const date1 = dateGenerator.generate();
            await sleep(100);
            const date2 = dateGenerator.generate();

            expect(date1).not.toEqual(dateGenerator.lastGenerated());
            expect(date2).toEqual(dateGenerator.lastGenerated());
        });
    });
});
