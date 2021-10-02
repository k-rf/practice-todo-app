import { InfrastructureException } from "./infrastructure.exception";

describe("InfrastructureException", () => {
    it("should be defined", () => {
        expect(new InfrastructureException()).toBeDefined();
    });
});
