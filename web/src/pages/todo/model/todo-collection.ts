import { Type } from "class-transformer";
import { Todo } from "./todo";

export class TodoCollection {
    @Type(() => Todo)
    readonly value: Todo[];

    constructor(value?: Todo[]) {
        this.value = value ?? [];
    }

    findById(id: string) {
        return this.value.find((e) => e.id === id);
    }

    append(value: Todo) {
        return new TodoCollection(this.value.concat(value));
    }

    remove(id: string) {
        return new TodoCollection(this.value.filter((e) => e.id !== id));
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
