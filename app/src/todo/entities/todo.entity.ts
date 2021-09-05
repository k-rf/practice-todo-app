import { TodoCompletedDate } from "./todo-completed-date";
import { TodoCreatedDate } from "./todo-created-date";
import { TodoDescription } from "./todo-description";
import { TodoDueDate } from "./todo-due-date";
import { TodoId } from "./todo-id";
import { TodoTitle } from "./todo-title";

interface Props {
    id: TodoId;
    title: TodoTitle;
    description: TodoDescription;
    createdAt: TodoCreatedDate;
    due?: TodoDueDate;
    completedAt?: TodoCompletedDate;
}

export class Todo {
    readonly id: TodoId;
    readonly title: TodoTitle;
    readonly description: TodoDescription;
    readonly createdAt: TodoCreatedDate;
    readonly due?: TodoDueDate;
    readonly completedAt?: TodoCompletedDate;

    constructor(props: Props) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.due = props.due;
        this.createdAt = props.createdAt;
        this.completedAt = props.completedAt;
    }
}
