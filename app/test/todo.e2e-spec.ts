import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { TodoCreatedDate } from "todo/entities/todo-created-date";
import { TodoDescription } from "todo/entities/todo-description";
import { TodoId } from "todo/entities/todo-id";
import { TODO_STATUS } from "todo/entities/todo-status";
import { TodoTitle } from "todo/entities/todo-title";
import { Todo } from "todo/entities/todo.entity";
import { TodoInMemoryRepository } from "todo/repository/in-memory/todo-in-memory-repository";
import { TodoModule } from "todo/todo.module";
import { DateGenerator } from "utils/date-generator";
import { UUID } from "utils/uuid";
import { UUIDGenerator } from "utils/uuid-generator";

describe("TodoController (e2e)", () => {
    let app: INestApplication;
    let uuidGenerator: UUIDGenerator;
    let dateGenerator: DateGenerator;
    let repository: TodoInMemoryRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TodoModule],
        }).compile();

        uuidGenerator = moduleFixture.get<UUIDGenerator>(UUIDGenerator);
        dateGenerator = moduleFixture.get<DateGenerator>(DateGenerator);
        repository = moduleFixture.get<TodoInMemoryRepository>(
            TodoInMemoryRepository,
        );

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe("TODO を作成する (POST /todo)", () => {
        it("正常な値を与える", () => {
            const title = "abc";
            const description = "xyz";
            const createdAt = new Date();

            const dto = {
                title,
                description,
                createdAt,
            };

            return request(app.getHttpServer())
                .post("/todo")
                .send(dto)
                .expect(201)
                .expect((res) => {
                    expect(res.body.id).toEqual(
                        String(uuidGenerator.lastGenerated()),
                    );
                })
                .expect(() => {
                    const todo = new Todo({
                        id: new TodoId(uuidGenerator.lastGenerated()),
                        title: new TodoTitle(title),
                        description: new TodoDescription(description),
                        createdAt: new TodoCreatedDate(createdAt),
                    });
                    expect(repository.value[0]).toEqual(todo);
                });
        });

        describe("不正な値を与える", () => {
            it("条件を満たさない値を含むと Domain Exception が発生する", () => {
                const dto = {
                    title: "",
                    description: "",
                    createdAt: new Date(),
                };

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
        it("正常な値を与える", async () => {
            const dto = {
                title: "abc",
                description: "xyz",
                createdAt: new Date(),
            };

            const response = await request(app.getHttpServer())
                .post("/todo")
                .send(dto);
            const id = response.body.id;

            return request(app.getHttpServer())
                .delete(`/todo/${String(id)}`)
                .expect(200)
                .expect(() => {
                    expect(repository.value.length).toEqual(0);
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

    describe("TODO をステータスを更新する (PUT /todo/:id/status", () => {
        describe("正常な値を与える", () => {
            let id: string;
            beforeEach(async () => {
                const dto = {
                    title: "abc",
                    description: "xyz",
                    createdAt: new Date(),
                };

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
                    .expect(() => {
                        const todo = repository.value[0];
                        expect(todo.status).toEqual(TODO_STATUS.DONE);
                        expect(todo.completedAt).toEqual(
                            dateGenerator.lastGenerated(),
                        );
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
                    .expect(() => {
                        const todo = repository.value[0];
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
});
