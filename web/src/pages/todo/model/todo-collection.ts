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

    nextPosition() {
        const maxY = this.value.reduce((p, c) => Math.max(p, c.y), 0);
        const target = this.value
            .filter((e) => e.y === maxY)
            .sort((a, b) => a.x - b.x)
            .at(0);

        const targetY = target?.y ?? 0;
        const targetH = target?.h ?? 0;
        return { x: target?.x ?? 0, y: targetY + targetH };
    }
}
