import { Module } from "@nestjs/common";
import { UUIDGenerator } from "./uuid-generator";

@Module({ providers: [UUIDGenerator], exports: [UUIDGenerator] })
export class UtilsModule {}
