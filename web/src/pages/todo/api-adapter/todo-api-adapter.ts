import { plainToClass } from "class-transformer";
import { Todo } from "../model/todo";
import { TodoCollection } from "../model/todo-collection";
import { isOk, timeoutFetch } from "utils/timeout-fetch";

const baseUri = import.meta.env.VITE_BASE_URI ?? process.env.BASE_URI ?? "";

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

namespace RemoveTodo {
    export interface Request {
        id: string;
    }
}

export class TodoApiAdapter {
    async findAll() {
        const result = await timeoutFetch(`${baseUri}/todo`);

        if (isOk(result)) {
            const data = await result.json();
            return plainToClass(TodoCollection, { value: data });
        } else {
            throw new Error(`Todo の読み込みに失敗しました`);
        }
    }

    async create(value: CreateTodo.Request) {
        const result = await timeoutFetch(`${baseUri}/todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        if (isOk(result)) {
            const data: CreateTodo.Response = await result.json();
            return plainToClass(Todo, { ...value, ...data });
        } else {
            throw new Error(`Todo の作成に失敗しました`);
        }
    }

    async remove(value: RemoveTodo.Request) {
        const result = await timeoutFetch(`${baseUri}/todo/${value.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!isOk(result)) {
            throw new Error(`Todo の削除に失敗しました`);
        }
    }
}
