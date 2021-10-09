import { Test, TestingModule } from "@nestjs/testing";
import { plainToClass } from "class-transformer";
import { DateGenerator } from "utils/date-generator";
import { UtilsModule } from "utils/utils.module";
import { UUIDGenerator } from "utils/uuid-generator";
import { ChangeTodoStatusDto } from "./dto/change-todo-status.dto";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoCreatedDate } from "./entities/todo-created-date";
import { TodoDescription } from "./entities/todo-description";
import { TodoId } from "./entities/todo-id";
import { TODO_STATUS } from "./entities/todo-status";
import { TodoTitle } from "./entities/todo-title";
import { Todo } from "./entities/todo.entity";
import { TodoInMemoryRepository } from "./repository/in-memory/todo-in-memory-repository";
import { TodoService } from "./todo.service";

describe("TodoService", () => {
    let service: TodoService;
    let uuidGenerator: UUIDGenerator;
    let dateGenerator: DateGenerator;
    let repository: TodoInMemoryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UtilsModule],
            providers: [TodoService, TodoInMemoryRepository],
        }).compile();

        service = module.get<TodoService>(TodoService);
        uuidGenerator = module.get<UUIDGenerator>(UUIDGenerator);
        dateGenerator = module.get<DateGenerator>(DateGenerator);
        repository = module.get<TodoInMemoryRepository>(TodoInMemoryRepository);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("create メソッド", () => {
        it("TODO を作成する", async () => {
            const createdAt = new Date();
            const createTodoDto = plainToClass(CreateTodoDto, {
                title: "abc",
                description: "xyz",
                createdAt,
            });

            await service.create(createTodoDto);

            const todo = new Todo({
                id: new TodoId(uuidGenerator.lastGenerated()),
                title: new TodoTitle("abc"),
                description: new TodoDescription("xyz"),
                createdAt: new TodoCreatedDate(createdAt),
            });

            expect(repository.value[0]).toEqual(todo);
        });
    });

    describe("findOne メソッド", () => {
        beforeEach(async () => {
            const createdAt = new Date();
            const createTodoDto = plainToClass(CreateTodoDto, {
                title: "abc",
                description: "xyz",
                createdAt,
            });

            await service.create(createTodoDto);
        });

        it("指定した TODO を取得する", async () => {
            const id = new TodoId(uuidGenerator.lastGenerated());

            const todo = await service.findOne(id);

            expect(todo.id).toEqual(id);
        });
    });

    describe("remove メソッド", () => {
        beforeEach(async () => {
            const createdAt = new Date();
            const createTodoDto = plainToClass(CreateTodoDto, {
                title: "abc",
                description: "xyz",
                createdAt,
            });

            await service.create(createTodoDto);
        });

        it("TODO を削除する", async () => {
            const id = uuidGenerator.lastGenerated();

            await service.remove(id);

            expect(repository.value.length).toEqual(0);
        });
    });

    describe("changeStatus メソッド", () => {
        beforeEach(async () => {
            const createdAt = new Date();
            const createTodoDto = plainToClass(CreateTodoDto, {
                title: "abc",
                description: "xyz",
                createdAt,
            });

            await service.create(createTodoDto);
        });

        it("TODO を「完了」状態にする", async () => {
            const id = uuidGenerator.lastGenerated();
            const todoId = new TodoId(id);
            const changeStatusDto = plainToClass(ChangeTodoStatusDto, {
                id,
                status: "DONE",
            });

            const doneTodo = await service.changeStatus(changeStatusDto);
            const stored = await repository.findOne(todoId);

            expect(stored).toEqual(doneTodo);
            expect(stored.status).toEqual(TODO_STATUS.DONE);
            expect(stored.completedAt).toEqual(dateGenerator.lastGenerated());
        });

        it("TODO を「未完了」状態にする", async () => {
            const id = uuidGenerator.lastGenerated();
            const todoId = new TodoId(id);
            const changeStatusDto = plainToClass(ChangeTodoStatusDto, {
                id,
                status: "PENDING",
            });

            const undoneTodo = await service.changeStatus(changeStatusDto);
            const stored = await repository.findOne(todoId);

            expect(stored).toEqual(undoneTodo);
            expect(stored.status).toEqual(TODO_STATUS.PENDING);
            expect(stored.completedAt).toBeUndefined();
        });
    });
});
