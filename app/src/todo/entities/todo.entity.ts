import { TodoCompletedDate } from "./todo-completed-date";
import { TodoCreatedDate } from "./todo-created-date";
import { TodoDescription } from "./todo-description";
import { TodoDueDate } from "./todo-due-date";
import { TodoId } from "./todo-id";
import { TodoRect } from "./todo-rect";
import { TodoStatus, TODO_STATUS } from "./todo-status";
import { TodoTitle } from "./todo-title";

export interface Props {
    id: TodoId;
    title: TodoTitle;
    description?: TodoDescription;
    status?: TodoStatus;
    createdAt: TodoCreatedDate;
    due?: TodoDueDate;
    completedAt?: TodoCompletedDate;
    rect: TodoRect;
}

export class Todo {
    readonly id: TodoId;
    readonly title: TodoTitle;
    readonly description?: TodoDescription;
    readonly status: TodoStatus;
    readonly createdAt: TodoCreatedDate;
    readonly due?: TodoDueDate;
    readonly completedAt?: TodoCompletedDate;
    readonly rect: TodoRect;

    private constructor(props: Props) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.status = props.status ?? TODO_STATUS.PENDING;
        this.createdAt = props.createdAt;
        this.due = props.due;
        this.completedAt = props.completedAt;
        this.rect = props.rect;
    }

    static of(propsOverridden?: Partial<Props>) {
        return new Todo({
            id: new TodoId(),
            title: new TodoTitle("Default Title"),
            createdAt: new TodoCreatedDate(),
            rect: TodoRect.of(),
            ...propsOverridden,
        });
    }

    done(completedAt: TodoCompletedDate) {
        return new Todo({
            ...this,
            status: TODO_STATUS.DONE,
            completedAt,
        });
    }

    undone() {
        return new Todo({
            ...this,
            status: TODO_STATUS.PENDING,
            completedAt: undefined,
        });
    }
}
