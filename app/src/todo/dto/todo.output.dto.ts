import { TodoStatus } from "todo/entities/todo-status";
import { UUID } from "utils/uuid";

interface Props {
    id: string;
    title: string;
    description?: string;
    status: TodoStatus;
    createdAt: Date;
    due?: Date;
    completedAt?: Date;
    x: number;
    y: number;
    w: number;
    h: number;
}

export class TodoDto {
    readonly id: string;
    readonly title: string;
    readonly description?: string;
    readonly status: TodoStatus;
    readonly createdAt: Date;
    readonly due?: Date;
    readonly completedAt?: Date;
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;

    private constructor(props: Props) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.createdAt = props.createdAt;
        this.status = props.status;
        this.due = props.due;
        this.completedAt = props.completedAt;
        this.x = props.x;
        this.y = props.y;
        this.w = props.w;
        this.h = props.h;
    }

    static of(propsOverridden?: Partial<Props>) {
        return new TodoDto({
            id: String(new UUID()),
            title: "Default Title",
            description: undefined,
            status: "PENDING",
            createdAt: new Date(),
            due: undefined,
            completedAt: undefined,
            x: 0,
            y: 0,
            w: 3,
            h: 2,
            ...propsOverridden,
        });
    }
}
