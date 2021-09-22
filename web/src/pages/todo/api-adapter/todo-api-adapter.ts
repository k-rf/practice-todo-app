import { plainToClass } from "class-transformer";
import { Todo } from "../model/todo";
import { TodoCollection } from "../model/todo-collection";

const baseUri = import.meta.env.VITE_BASE_URI ?? process.env.BASE_URI;

namespace CreateTodo {
    export interface Request {
        title: string;
        description: string;
        createdAt: Date;
    }

    export interface Response {
        id: string;
    }
}

export class TodoApiAdapter {
    async findAll() {
        const res = await fetch(baseUri + "/todo");
        const data = await res.json();

        return plainToClass(TodoCollection, { value: data });
    }

    async create(value: CreateTodo.Request) {
        const res = await fetch(baseUri + "/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });
        const data: CreateTodo.Response = await res.json();

        return plainToClass(Todo, { ...value, ...data });
    }
}
