import { Todo } from "todo/entities/todo.entity";
import {
    Todo as PrismaTodo,
    TodoStatus as PrismaTodoStatus,
    Prisma,
} from "@prisma/client";
import { TodoCompletedDate } from "todo/entities/todo-completed-date";
import { TodoCreatedDate } from "todo/entities/todo-created-date";
import { TodoDescription } from "todo/entities/todo-description";
import { TodoDueDate } from "todo/entities/todo-due-date";
import { TodoId } from "todo/entities/todo-id";
import { TodoRect } from "todo/entities/todo-rect";
import { TodoRectX } from "todo/entities/todo-rect/todo-rect-x";
import { TodoRectY } from "todo/entities/todo-rect/todo-rect-y";
import { TodoRectW } from "todo/entities/todo-rect/todo-rect-w";
import { TodoRectH } from "todo/entities/todo-rect/todo-rect-h";
import { TodoTitle } from "todo/entities/todo-title";
import { TodoStatus } from "todo/entities/todo-status";

const mapToDataModel = (value: Todo): Prisma.TodoCreateInput => {
    return {
        id: value.id.value,
        title: value.title.value,
        description: value.description?.value ?? null,
        createdAt: value.createdAt,
        completedAt: value.completedAt ?? null,
        due: value.due ?? null,
        x: value.rect.x.value,
        y: value.rect.y.value,
        w: value.rect.w.value,
        h: value.rect.h.value,
        status: {
            connect: {
                name: value.status,
            },
        },
    };
};

type DataModel = PrismaTodo & {
    status: PrismaTodoStatus;
};

const mapToDomainModel = (value: DataModel) => {
    return Todo.of({
        completedAt: value.completedAt
            ? new TodoCompletedDate(value.completedAt)
            : undefined,
        createdAt: new TodoCreatedDate(value.createdAt),
        description: value.description
            ? new TodoDescription(value.description)
            : undefined,
        due: value.due ? new TodoDueDate(value.due) : undefined,
        id: new TodoId(value.id),
        rect: TodoRect.of({
            x: new TodoRectX(value.x),
            y: new TodoRectY(value.y),
            w: new TodoRectW(value.w),
            h: new TodoRectH(value.h),
        }),
        title: new TodoTitle(value.title),
        status: value.status.name as TodoStatus,
    });
};

export {
    DataModel as TodoDataModel,
    mapToDataModel as mapToTodoDataModel,
    mapToDomainModel as mapToTodoDomainModel,
};
