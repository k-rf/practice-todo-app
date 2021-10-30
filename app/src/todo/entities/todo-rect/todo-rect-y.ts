import { DomainException } from "exception/domain.exception";

export class TodoRectY {
    constructor(readonly value: number) {
        const MIN = 0 as const;

        if (MIN <= value) {
            this.value = value;
        } else {
            throw new DomainException(`y: ${value} is out of range.`);
        }
    }
}
