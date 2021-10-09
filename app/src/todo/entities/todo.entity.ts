import { TodoCompletedDate } from "./todo-completed-date";
import { TodoCreatedDate } from "./todo-created-date";
import { TodoDescription } from "./todo-description";
import { TodoDueDate } from "./todo-due-date";
import { TodoId } from "./todo-id";
import { TodoStatus, TODO_STATUS } from "./todo-status";
import { TodoTitle } from "./todo-title";

interface Props {
    id: TodoId;
    title: TodoTitle;
    description: TodoDescription;
    status?: TodoStatus;
    createdAt: TodoCreatedDate;
    due?: TodoDueDate;
    completedAt?: TodoCompletedDate;
}

export class Todo {
    readonly id: TodoId;
    readonly title: TodoTitle;
    readonly description: TodoDescription;
    readonly status: TodoStatus;
    readonly createdAt: TodoCreatedDate;
    readonly due?: TodoDueDate;
    readonly completedAt?: TodoCompletedDate;

    constructor(props: Props) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.status = props.status ?? TODO_STATUS.PENDING;
        this.createdAt = props.createdAt;
        this.due = props.due;
        this.completedAt = props.completedAt;
    }

    done() {
        return new Todo({ ...this, status: TODO_STATUS.DONE });
    }

    undone() {
        return new Todo({ ...this, status: TODO_STATUS.PENDING });
    }
}
