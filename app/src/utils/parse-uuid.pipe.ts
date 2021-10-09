import {
    ArgumentMetadata,
    ParseUUIDPipe as NestParseUUIDPipe,
    ParseUUIDPipeOptions,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { UUID } from "./uuid";

export class ParseUUIDPipe {
    private pipe: NestParseUUIDPipe;

    constructor(options?: ParseUUIDPipeOptions) {
        this.pipe = new NestParseUUIDPipe(options);
    }

    async transform(value: string, metadata: ArgumentMetadata) {
        return plainToClass(UUID, {
            value: await this.pipe.transform(value, metadata),
        });
    }
}
