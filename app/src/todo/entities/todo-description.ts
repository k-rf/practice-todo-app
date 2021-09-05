export class TodoDescription {
    readonly value: string;

    constructor(value: string) {
        this.value = value;
    }

    equals(that: TodoDescription) {
        return this.value === that.value;
    }

    toString() {
        return this.value;
    }
}
