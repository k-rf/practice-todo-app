import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { TodoCreatedDate } from "todo/entities/todo-created-date";
import { TodoDescription } from "todo/entities/todo-description";
import { TodoId } from "todo/entities/todo-id";
import { TodoTitle } from "todo/entities/todo-title";
import { Todo } from "todo/entities/todo.entity";
import { TodoInMemoryRepository } from "todo/repository/in-memory/todo-in-memory-repository";
import { TodoModule } from "todo/todo.module";
import { UUID } from "utils/uuid";
import { UUIDGenerator } from "utils/uuid-generator";

describe("TodoController (e2e)", () => {
    let app: INestApplication;
    let generator: UUIDGenerator;
    let repository: TodoInMemoryRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TodoModule],
        }).compile();

        generator = moduleFixture.get<UUIDGenerator>(UUIDGenerator);
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
                        String(generator.lastGenerated()),
                    );
                })
                .expect(() => {
                    const todo = new Todo({
                        id: new TodoId(generator.lastGenerated()),
                        title: new TodoTitle(title),
                        description: new TodoDescription(description),
                        createdAt: new TodoCreatedDate(createdAt),
                    });
                    expect(repository.value[0]).toEqual(todo);
                });
        });

        describe("不正な値を与える", () => {
            it("Domain Exception が発生する", () => {
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

            it("Bad Request が発生する", () => {
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
});
