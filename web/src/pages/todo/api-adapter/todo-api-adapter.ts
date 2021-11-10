import { plainToClass } from "class-transformer";
import { Todo } from "../model/todo";
import { TodoCollection } from "../model/todo-collection";
import { isOk, timeoutFetch } from "utils/timeout-fetch";
import { TodoStatus } from "../model/todo-status";

const baseUri = import.meta.env.VITE_BASE_URI ?? process.env.BASE_URI ?? "";

namespace CreateTodo {
    export interface Request {
        title: string;
        description?: string;
        createdAt: Date;
        x: number;
        y: number;
        w: number;
        h: number;
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

namespace ChangeTodoStatus {
    export interface Request {
        id: string;
        status: TodoStatus;
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

    async changeStatus(value: ChangeTodoStatus.Request) {
        const result = await timeoutFetch(
            `${baseUri}/todo/${value.id}/status`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: value.status }),
            },
        );

        if (isOk(result)) {
            const data: Todo = await result.json();
            return plainToClass(Todo, { ...data });
        } else {
            throw new Error(`Todo のステータス更新に失敗しました`);
        }
    }

    async changeLayouts(value: Todo[]) {
        const result = await timeoutFetch(`${baseUri}/todo/layouts`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ todoCollection: value }),
        });

        if (!isOk(result)) {
            throw new Error(`Todo の配置の更新に失敗しました`);
        }
    }
}
