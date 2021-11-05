import { DomainException } from "exception/domain.exception";

const brand = Symbol();
export class TodoRectX {
    private [brand]: never;

    constructor(readonly value: number) {
        const MIN = 0 as const;
        const MAX = 11 as const;

        if (MIN <= value && value <= MAX) {
            this.value = value;
        } else {
            throw new DomainException(`x: ${value} is out of range.`);
        }
    }
}
