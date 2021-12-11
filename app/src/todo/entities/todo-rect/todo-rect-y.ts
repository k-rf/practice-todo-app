import { DomainException } from "lib/exception/domain.exception";

const brand = Symbol();
export class TodoRectY {
    private [brand]: never;

    constructor(readonly value: number) {
        const MIN = 0 as const;

        if (MIN <= value) {
            this.value = value;
        } else {
            throw new DomainException(`y: ${value} is out of range.`);
        }
    }
}
