import { Test, TestingModule } from "@nestjs/testing";
import { DateGenerator } from "utils/date-generator";
import { UtilsModule } from "utils/utils.module";
import { UUIDGenerator } from "utils/uuid-generator";
import { ChangeTodoLayoutsDto } from "./dto/change-todo-layouts.dto";
import { ChangeTodoStatusDto } from "./dto/change-todo-status.dto";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoDto } from "./dto/todo.output.dto";
import { TodoCreatedDate } from "./entities/todo-created-date";
import { TodoDescription } from "./entities/todo-description";
import { TodoId } from "./entities/todo-id";
import { TodoRect } from "./entities/todo-rect";
import { TodoRectH } from "./entities/todo-rect/todo-rect-h";
import { TodoRectW } from "./entities/todo-rect/todo-rect-w";
import { TodoRectX } from "./entities/todo-rect/todo-rect-x";
import { TodoRectY } from "./entities/todo-rect/todo-rect-y";
import { TODO_STATUS } from "./entities/todo-status";
import { TodoTitle } from "./entities/todo-title";
import { Todo } from "./entities/todo.entity";
import { TodoInMemoryRepository } from "./repository/in-memory/todo-in-memory-repository";
import { TodoPrismaRepository } from "./repository/prisma/todo-prisma-repository";
import { TodoService } from "./todo.service";

describe("TodoService", () => {
    let service: TodoService;
    let uuidGenerator: UUIDGenerator;
    let dateGenerator: DateGenerator;
    let repository: TodoInMemoryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UtilsModule],
            providers: [
                TodoService,
                {
                    provide: TodoPrismaRepository,
                    useValue: new TodoInMemoryRepository(),
                },
            ],
        }).compile();

        service = module.get(TodoService);
        uuidGenerator = module.get(UUIDGenerator);
        dateGenerator = module.get(DateGenerator);
        repository = module.get(TodoPrismaRepository);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("create メソッド", () => {
        it("TODO を作成する", async () => {
            const title = "abc";
            const description = "xyz";
            const createdAt = new Date();
            const [x, y, h, w] = [2, 2, 3, 3];

            await service.create(
                CreateTodoDto.of({
                    title,
                    description,
                    createdAt,
                    x,
                    y,
                    w,
                    h,
                }),
            );

            const todo = Todo.of({
                id: new TodoId(uuidGenerator.lastGenerated()),
                title: new TodoTitle(title),
                description: new TodoDescription(description),
                createdAt: new TodoCreatedDate(createdAt),
                rect: new TodoRect({
                    x: new TodoRectX(x),
                    y: new TodoRectY(y),
                    w: new TodoRectW(w),
                    h: new TodoRectH(h),
                }),
            });

            expect(repository.value[0]).toEqual(todo);
        });
    });

    describe("findOne メソッド", () => {
        beforeEach(async () => {
            await service.create(CreateTodoDto.of());
        });

        it("指定した TODO を取得する", async () => {
            const id = new TodoId(uuidGenerator.lastGenerated());

            const todo = await service.findOne(id);

            expect(todo.id).toEqual(String(id));
        });
    });

    describe("remove メソッド", () => {
        beforeEach(async () => {
            await service.create(CreateTodoDto.of());
        });

        it("TODO を削除する", async () => {
            const id = uuidGenerator.lastGenerated();

            await service.remove(id);

            expect(repository.value.length).toEqual(0);
        });
    });

    describe("changeStatus メソッド", () => {
        beforeEach(async () => {
            await service.create(CreateTodoDto.of());
        });

        it("TODO を「完了」状態にする", async () => {
            const id = uuidGenerator.lastGenerated();
            const todoId = new TodoId(id);
            const changeStatusDto = ChangeTodoStatusDto.of({
                id,
                status: "DONE",
            });

            const doneTodo = await service.changeStatus(changeStatusDto);
            const stored = await repository.findOne(todoId);

            expect(String(stored.id)).toEqual(doneTodo.id);
            expect(stored.status).toEqual(TODO_STATUS.DONE);
            expect(stored.completedAt).toEqual(dateGenerator.lastGenerated());
        });

        it("TODO を「未完了」状態にする", async () => {
            const id = uuidGenerator.lastGenerated();
            const todoId = new TodoId(id);
            const changeStatusDto = ChangeTodoStatusDto.of({
                id,
                status: "PENDING",
            });

            const undoneTodo = await service.changeStatus(changeStatusDto);
            const stored = await repository.findOne(todoId);

            expect(String(stored.id)).toEqual(undoneTodo.id);
            expect(stored.status).toEqual(TODO_STATUS.PENDING);
            expect(stored.completedAt).toBeUndefined();
        });
    });

    describe("changeLayouts メソッド", () => {
        let todoCollection: Todo[];

        beforeEach(async () => {
            todoCollection = [
                Todo.of({
                    rect: TodoRect.of({
                        x: new TodoRectX(0),
                        y: new TodoRectY(0),
                    }),
                }),
                Todo.of({
                    rect: TodoRect.of({
                        x: new TodoRectX(3),
                        y: new TodoRectY(4),
                    }),
                }),
            ];

            await Promise.all(
                todoCollection.map(async (todo) => {
                    await repository.save(todo);
                }),
            );
        });

        it("すべての TODO の配置やサイズを更新する", async () => {
            const dto = ChangeTodoLayoutsDto.of({
                todoCollection: [
                    TodoDto.of({
                        id: String(todoCollection[0].id),
                        createdAt: todoCollection[0].createdAt,
                        x: 4,
                        y: 0,
                    }),
                    TodoDto.of({
                        id: String(todoCollection[1].id),
                        createdAt: todoCollection[1].createdAt,
                        x: 3,
                        y: 2,
                    }),
                ],
            });

            await service.changeLayouts(dto);

            const expected = [
                Todo.of({
                    id: todoCollection[0].id,
                    createdAt: todoCollection[0].createdAt,
                    rect: TodoRect.of({
                        x: new TodoRectX(4),
                        y: new TodoRectY(0),
                    }),
                }),
                Todo.of({
                    id: todoCollection[1].id,
                    createdAt: todoCollection[1].createdAt,
                    rect: TodoRect.of({
                        x: new TodoRectX(3),
                        y: new TodoRectY(2),
                    }),
                }),
            ];

            expect(repository.value).toStrictEqual(expected);
        });
    });
});
