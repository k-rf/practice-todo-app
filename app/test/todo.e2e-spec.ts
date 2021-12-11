import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "lib/prisma/prisma.service";
import * as request from "supertest";
import { ChangeTodoLayoutsDto } from "todo/dto/change-todo-layouts.dto";
import { TodoDto } from "todo/dto/todo.output.dto";
import { TodoCreatedDate } from "todo/entities/todo-created-date";
import { TodoDescription } from "todo/entities/todo-description";
import { TodoId } from "todo/entities/todo-id";
import { TodoRect } from "todo/entities/todo-rect";
import { TodoRectH } from "todo/entities/todo-rect/todo-rect-h";
import { TodoRectW } from "todo/entities/todo-rect/todo-rect-w";
import { TodoRectX } from "todo/entities/todo-rect/todo-rect-x";
import { TodoRectY } from "todo/entities/todo-rect/todo-rect-y";
import { TODO_STATUS } from "todo/entities/todo-status";
import { TodoTitle } from "todo/entities/todo-title";
import { Todo } from "todo/entities/todo.entity";
import { TodoPrismaRepository } from "todo/repository/prisma/todo-prisma-repository";
import { TodoModule } from "todo/todo.module";
import { DateGenerator } from "utils/date-generator";
import { UUID } from "utils/uuid";
import { UUIDGenerator } from "utils/uuid-generator";

const testCreateTodoDto = {
    of: (
        propsOverridden?: Partial<{
            title: string;
            description: string;
            createdAt: Date;
            x: number;
            y: number;
            w: number;
            h: number;
        }>,
    ) => {
        return {
            title: "Default",
            description: "Default",
            createdAt: new Date(),
            x: 0,
            y: 0,
            w: 3,
            h: 2,
            ...propsOverridden,
        };
    },
};

describe("TodoController (e2e)", () => {
    let app: INestApplication;
    let prismaService: PrismaService;
    let uuidGenerator: UUIDGenerator;
    let repository: TodoPrismaRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TodoModule],
        }).compile();

        prismaService = moduleFixture.get(PrismaService);
        uuidGenerator = moduleFixture.get(UUIDGenerator);
        repository = moduleFixture.get(TodoPrismaRepository);

        app = moduleFixture.createNestApplication();
        await app.init();

        await prismaService.cleanUp();
    });

    describe("TODO を作成する (POST /todo)", () => {
        beforeEach(async () => {
            await prismaService.cleanUp();
        });

        it("正常な値を与える", () => {
            const title = "abc";
            const description = "xyz";
            const createdAt = new Date();
            const x = 2;
            const y = 2;
            const w = 3;
            const h = 3;

            const dto = testCreateTodoDto.of({
                title,
                description,
                createdAt,
                x,
                y,
                w,
                h,
            });

            return request(app.getHttpServer())
                .post("/todo")
                .send(dto)
                .expect(201)
                .expect((res) => {
                    expect(res.body.id).toEqual(
                        String(uuidGenerator.lastGenerated()),
                    );
                })
                .expect(async () => {
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
                    await expect(repository.findOne(todo.id)).resolves.toEqual(
                        todo,
                    );
                });
        });

        describe("不正な値を与える", () => {
            it("条件を満たさない値を含むと Domain Exception が発生する", () => {
                const dto = testCreateTodoDto.of({
                    title: "",
                    description: "",
                    createdAt: new Date(),
                });

                return request(app.getHttpServer())
                    .post("/todo")
                    .send(dto)
                    .expect(400)
                    .expect((res) => {
                        const { error } = res.body;

                        expect({ error }).toEqual({
                            error: "Domain Exception",
                        });
                    });
            });

            it("欠損値があると Bad Request が発生する", () => {
                const dto = {
                    title: "abc",
                    description: "",
                };

                return request(app.getHttpServer())
                    .post("/todo")
                    .send(dto)
                    .expect(400)
                    .expect((res) => {
                        const { error } = res.body;

                        expect({ error }).toEqual({
                            error: "Bad Request",
                        });
                    });
            });
        });
    });

    describe("TODO を削除する (DELETE /todo/:id)", () => {
        beforeEach(async () => {
            await prismaService.cleanUp();
        });

        it("正常な値を与える", async () => {
            const dto = testCreateTodoDto.of();

            const response = await request(app.getHttpServer())
                .post("/todo")
                .send(dto);
            const id = response.body.id;

            return request(app.getHttpServer())
                .delete(`/todo/${String(id)}`)
                .expect(200)
                .expect(async () => {
                    await expect(repository.count()).resolves.toEqual(0);
                });
        });

        describe("不正な値を与える", () => {
            it("存在しない ID を与えると Bad Request が発生する", () => {
                const id = new UUID();

                return request(app.getHttpServer())
                    .delete(`/todo/${String(id)}`)
                    .expect(404);
            });
        });
    });

    describe("TODO をステータスを更新する (PUT /todo/:id/status)", () => {
        beforeEach(async () => {
            await prismaService.cleanUp();
        });

        describe("正常な値を与える", () => {
            let id: string;
            beforeEach(async () => {
                const dto = testCreateTodoDto.of();

                const response = await request(app.getHttpServer())
                    .post("/todo")
                    .send(dto);
                id = response.body.id;
            });

            it("TODO を完了にする", async () => {
                const dto = {
                    status: "DONE",
                };

                return request(app.getHttpServer())
                    .put(`/todo/${String(id)}/status`)
                    .send(dto)
                    .expect(200)
                    .expect(async () => {
                        const todo = await repository.findOne(new TodoId(id));
                        // Todo: FE から完了日を渡すようにする
                        // expect(todo.completedAt).toEqual(
                        //     dateGenerator.lastGenerated(),
                        // );
                        expect(todo.status).toEqual(TODO_STATUS.DONE);
                    });
            });

            it("TODO を未完了にする", async () => {
                const dto = {
                    status: "PENDING",
                };

                return request(app.getHttpServer())
                    .put(`/todo/${String(id)}/status`)
                    .send(dto)
                    .expect(200)
                    .expect(async () => {
                        const todo = await repository.findOne(new TodoId(id));
                        expect(todo.status).toEqual(TODO_STATUS.PENDING);
                        expect(todo.completedAt).toBeUndefined();
                    });
            });
        });

        describe("不正な値を与える", () => {
            it("存在しない ID を与えると Bad Request が発生する", () => {
                const id = new UUID();
                const dto = {
                    status: "DONE",
                };

                return request(app.getHttpServer())
                    .put(`/todo/${String(id)}/status`)
                    .send(dto)
                    .expect(404);
            });
        });
    });

    describe("TODO を配置を更新する (PUT /todo/layouts)", () => {
        let todoCollection: Todo[];

        beforeEach(async () => {
            await prismaService.cleanUp();

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

        describe("正常な値を与える", () => {
            it("TODO の配置を更新する", async () => {
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

                return request(app.getHttpServer())
                    .put(`/todo/layouts`)
                    .send(dto)
                    .expect(200)
                    .expect(async () => {
                        await expect(
                            repository.findAll(),
                        ).resolves.toStrictEqual(expected);
                    });
            });
        });
    });
});
