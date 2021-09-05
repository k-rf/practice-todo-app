interface Props {
    title: string;
    description: string;
    createdAt: Date;
    due?: Date;
    completedAt?: Date;
}

export class CreateTodoDto {
    readonly title: string;
    readonly description: string;
    readonly createdAt: Date;
    readonly due?: Date;
    readonly completedAt?: Date;

    constructor(props: Props) {
        this.title = props.title;
        this.description = props.description;
        this.createdAt = props.createdAt;
        this.due = props.due;
        this.completedAt = props.completedAt;
    }
}
