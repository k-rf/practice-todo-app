import { DomainException } from "exception/domain.exception";

export class TodoTitle {
    readonly value: string;

    constructor(value: string) {
        this.validate(value);

        this.value = value;
    }

    equals(that: TodoTitle) {
        return this.value === that.value;
    }

    toString() {
        return this.value;
    }

    private validate(value: string) {
        if (value === "") {
            throw new DomainException("Empty is not allowed.");
        }
    }
}
