import { TodoId } from "./todo-id";

describe("TodoId", () => {
    it("should be defined", () => {
        expect(new TodoId()).toBeDefined();
    });
});
