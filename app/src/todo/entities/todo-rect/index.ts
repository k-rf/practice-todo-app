import { TodoRectH } from "./todo-rect-h";
import { TodoRectW } from "./todo-rect-w";
import { TodoRectX } from "./todo-rect-x";
import { TodoRectY } from "./todo-rect-y";

interface Props {
    x: TodoRectX;
    y: TodoRectY;
    w: TodoRectW;
    h: TodoRectH;
}

export class TodoRect {
    readonly x: TodoRectX;
    readonly y: TodoRectY;
    readonly w: TodoRectW;
    readonly h: TodoRectH;

    constructor(props: Props) {
        this.x = props.x;
        this.y = props.y;
        this.w = props.w;
        this.h = props.h;
    }
}
