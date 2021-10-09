import { Module } from "@nestjs/common";
import { DateGenerator } from "./date-generator";
import { UUIDGenerator } from "./uuid-generator";

@Module({
    providers: [UUIDGenerator, DateGenerator],
    exports: [UUIDGenerator, DateGenerator],
})
export class UtilsModule {}
