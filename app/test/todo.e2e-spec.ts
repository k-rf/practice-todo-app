import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { CreateTodoDto } from "todo/dto/create-todo.dto";
import { TodoCreatedDate } from "todo/entities/todo-created-date";
import { TodoDescription } from "todo/entities/todo-description";
import { TodoId } from "todo/entities/todo-id";
import { TodoTitle } from "todo/entities/todo-title";
import { Todo } from "todo/entities/todo.entity";
import { TodoInMemoryRepository } from "todo/repository/in-memory/todo-in-memory-repository";
import { TodoModule } from "todo/todo.module";
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

    it("TODO を作成する (POST /todo)", () => {
        const title = "abc";
        const description = "xyz";
        const createdAt = new Date();

        const dto = new CreateTodoDto({
            title,
            description,
            createdAt,
        });

        return request(app.getHttpServer())
            .post("/todo")
            .set("Accept", "application/json")
            .send(dto)
            .expect(201)
            .expect((res) => {
                expect(res.body.id).toEqual(String(generator.lastGenerated()));
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
});
