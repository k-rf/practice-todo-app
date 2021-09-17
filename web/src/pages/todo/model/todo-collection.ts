import { Type } from "class-transformer";
import { Todo } from "./todo";

export class TodoCollection {
    @Type(() => Todo)
    readonly value: Todo[];
}
