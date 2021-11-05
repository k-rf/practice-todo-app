import { DomainException } from "exception/domain.exception";

const brand = Symbol();
export class TodoRectW {
    private [brand]: never;
    constructor(readonly value: number) {
        const MIN = 2 as const;
        const MAX = 6 as const;

        if (MIN <= value && value <= MAX) {
            this.value = value;
        } else {
            throw new DomainException(`w: ${value} is out of range.`);
        }
    }
}
