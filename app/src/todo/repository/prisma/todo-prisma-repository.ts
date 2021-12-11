import { Injectable } from "@nestjs/common";
import { InfrastructureException } from "lib/exception/infrastructure.exception";
import { PrismaService } from "lib/prisma/prisma.service";
import { TodoId } from "todo/entities/todo-id";
import { TodoRepository } from "todo/entities/todo-repository.interface";
import { Todo } from "todo/entities/todo.entity";
import { mapToTodoDataModel, mapToTodoDomainModel } from "./mapper/todo.mapper";

@Injectable()
export class TodoPrismaRepository implements TodoRepository {
    constructor(private prisma: PrismaService) {}

    async count() {
        return await this.prisma.todo.count();
    }

    async findAll() {
        const result = await this.prisma.todo.findMany({
            include: { status: true },
            orderBy: [{ createdAt: "asc" }],
        });

        return result.map((e) => mapToTodoDomainModel(e));
    }

    async findOne(id: TodoId) {
        const result = await this.prisma.todo.findUnique({
            where: { id: `${String(id)}` },
            include: { status: true },
        });

        if (result) {
            return mapToTodoDomainModel(result);
        }

        throw new InfrastructureException(`Specified Todo is not existed.`);
    }

    async save(value: Todo) {
        await this.prisma.todo.upsert({
            create: mapToTodoDataModel(value),
            update: mapToTodoDataModel(value),
            where: { id: String(value.id) },
        });
    }

    async remove(id: TodoId) {
        try {
            await this.prisma.todo.delete({
                where: { id: String(id) },
            });
        } catch {
            throw new InfrastructureException(`Specified Todo is not existed.`);
        }
    }
}
