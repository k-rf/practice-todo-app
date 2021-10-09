import { UUID } from "./uuid";

export class UUIDGenerator {
    private _uuid: UUID;

    constructor() {
        this._uuid = new UUID();
    }

    generate() {
        this._uuid = new UUID();
        return this._uuid;
    }

    lastGenerated() {
        return this._uuid;
    }
}
