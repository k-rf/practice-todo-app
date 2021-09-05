import { Test, TestingModule } from "@nestjs/testing";
import { UtilsModule } from "utils/utils.module";
import { TodoInMemoryRepository } from "./repository/in-memory/todo-in-memory-repository";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

describe("TodoController", () => {
    let controller: TodoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UtilsModule],
            controllers: [TodoController],
            providers: [TodoService, TodoInMemoryRepository],
        }).compile();

        controller = module.get<TodoController>(TodoController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
