import { Test, TestingModule } from "@nestjs/testing";
import { UtilsModule } from "utils/utils.module";
import { UUIDGenerator } from "utils/uuid-generator";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoCreatedDate } from "./entities/todo-created-date";
import { TodoDescription } from "./entities/todo-description";
import { TodoId } from "./entities/todo-id";
import { TodoTitle } from "./entities/todo-title";
import { Todo } from "./entities/todo.entity";
import { TodoInMemoryRepository } from "./repository/in-memory/todo-in-memory-repository";
import { TodoService } from "./todo.service";

describe("TodoService", () => {
    let service: TodoService;
    let generator: UUIDGenerator;
    let repository: TodoInMemoryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UtilsModule],
            providers: [TodoService, TodoInMemoryRepository],
        }).compile();

        service = module.get<TodoService>(TodoService);
        generator = module.get<UUIDGenerator>(UUIDGenerator);
        repository = module.get<TodoInMemoryRepository>(TodoInMemoryRepository);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("create メソッド", () => {
        it("TODO を作成する", async () => {
            const createdAt = new Date();
            const createTodoDto = new CreateTodoDto({
                title: "abc",
                description: "xyz",
                createdAt,
            });

            await service.create(createTodoDto);

            const todo = new Todo({
                id: new TodoId(generator.lastGenerated()),
                title: new TodoTitle("abc"),
                description: new TodoDescription("xyz"),
                createdAt: new TodoCreatedDate(createdAt),
            });

            expect(repository.value[0]).toEqual(todo);
        });
    });

    describe("complete メソッド", () => {
        it.todo("TODO を「完了」状態にする");
    });

    describe("incomplete メソッド", () => {
        it.todo("TODO を「未完了」状態にする");
    });
});
