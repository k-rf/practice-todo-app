import "reflect-metadata";
import { Type } from "class-transformer";
import { IsDate, IsString, IsUUID } from "class-validator";

export class Todo {
    @Type() @IsUUID() readonly id: string;
    @Type() @IsString() readonly title: string;
    @Type() @IsString() readonly description: string;
    @Type() @IsDate() readonly createdAt: Date;
}
