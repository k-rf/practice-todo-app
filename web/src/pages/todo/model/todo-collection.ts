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

    remove(value: string) {
        return new TodoCollection(this.value.filter((e) => e.id !== value));
    }

    update(value: Todo) {
        const index = this.value.findIndex((e) => e.id === value.id);

        if (index === -1) {
            return this;
        }

        return new TodoCollection([
            ...this.value.slice(0, index),
            value,
            ...this.value.slice(index + 1),
        ]);
    }
}
