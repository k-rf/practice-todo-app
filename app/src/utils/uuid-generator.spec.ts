import { UUIDGenerator } from "./uuid-generator";

describe("UUIDGenerator", () => {
    let uuidGenerator: UUIDGenerator;

    beforeEach(() => {
        uuidGenerator = new UUIDGenerator();
    });
    it("should be defined", () => {
        expect(new UUIDGenerator()).toBeDefined();
    });

    describe("generate メソッド", () => {
        it("UUID を生成する", () => {
            expect(uuidGenerator.generate()).toBeDefined();
        });
    });

    describe("lastGenerated メソッド", () => {
        it("最後に生成した UUID を返す", () => {
            const uuid1 = uuidGenerator.generate();
            const uuid2 = uuidGenerator.generate();

            expect(uuid1).not.toEqual(uuidGenerator.lastGenerated());
            expect(uuid2).toEqual(uuidGenerator.lastGenerated());
        });
    });
});
