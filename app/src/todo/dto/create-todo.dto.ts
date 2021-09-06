import { IsDate, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
export class CreateTodoDto {
    @Type() @IsString() readonly title: string;
    @Type() @IsString() readonly description: string;
    @Type() @IsDate() readonly createdAt: Date;
    @Type() @IsOptional() @IsDate() readonly due?: Date;
    @Type() @IsOptional() @IsDate() readonly completedAt?: Date;
}
