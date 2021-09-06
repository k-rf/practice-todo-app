import { DomainExceptionFilter } from "./domain-exception.filter";

describe("DomainErrorFilter", () => {
    it("should be defined", () => {
        expect(new DomainExceptionFilter()).toBeDefined();
    });
});
