import { Type } from "class-transformer";
import { Todo } from "./todo";

export class TodoCollection {
    @Type(() => Todo)
    readonly value: Todo[];

    constructor(value?: Todo[]) {
        this.value = value ?? [];
    }

    append(value: Todo) {
        return new TodoCollection(this.value.concat(value));
    }
}
