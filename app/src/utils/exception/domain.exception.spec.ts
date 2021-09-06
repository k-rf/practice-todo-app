import { DomainException } from "./domain.exception";

describe("DomainException", () => {
    it("should be defined", () => {
        expect(new DomainException()).toBeDefined();
    });
});
