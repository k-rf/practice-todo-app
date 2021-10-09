import { Type } from "class-transformer";
import { IsString, IsUUID } from "class-validator";
import { UUID } from "utils/uuid";

export class ChangeTodoStatusDto {
    @Type() @IsUUID() readonly id: UUID;
    @Type() @IsString() readonly status: "DONE" | "PENDING";
}
