import { DomainException } from "exception/domain.exception";

export class TodoRectW {
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
