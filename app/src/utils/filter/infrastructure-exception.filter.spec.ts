import { InfrastructureExceptionFilter } from "./infrastructure-exception.filter";

describe("InfrastructureExceptionFilter", () => {
    it("should be defined", () => {
        expect(new InfrastructureExceptionFilter()).toBeDefined();
    });
});
