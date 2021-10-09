import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { UUID } from "utils/uuid";

export class ChangeTodoStatusDto {
    @Type(() => UUID) readonly id: UUID;
    @Type() @IsString() readonly status: "DONE" | "PENDING";
}
