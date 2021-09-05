import { Injectable } from "@nestjs/common";
import { UUID } from "./uuid";

@Injectable()
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
