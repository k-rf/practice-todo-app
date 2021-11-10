import { Type } from "class-transformer";
import { TodoDto } from "./todo.output.dto";

interface Props {
    todoCollection: TodoDto[];
}

export class ChangeTodoLayoutsDto {
    @Type(() => TodoDto) readonly todoCollection: TodoDto[];

    private constructor(props?: Props) {
        if (props) {
            this.todoCollection = props.todoCollection.map((e) =>
                TodoDto.of({
                    id: e.id,
                    title: e.title,
                    description: e.description,
                    status: e.status,
                    createdAt: e.createdAt,
                    due: e.due,
                    completedAt: e.completedAt,
                    x: e.x,
                    y: e.y,
                    w: e.w,
                    h: e.h,
                }),
            );
        }
    }

    static of(propsOverridden?: Partial<Props>) {
        return new ChangeTodoLayoutsDto({
            todoCollection: [],
            ...propsOverridden,
        });
    }
}
