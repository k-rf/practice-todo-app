import { v4 } from "uuid";

export class UUID {
    private value: string;

    constructor(value?: UUID) {
        this.value = value?.toString() ?? v4();
    }

    equals(that: UUID) {
        return this.value === that.value;
    }

    toString() {
        return this.value.toString();
    }
}
