import { Type } from "class-transformer";
import { IsDate, IsString, IsUUID } from "class-validator";
import "reflect-metadata";
import { TodoStatus } from "./todo-status";

export class Todo {
    @Type() @IsUUID() readonly id: string;
    @Type() @IsString() readonly title: string;
    @Type() @IsString() readonly description: string;
    @Type() @IsString() readonly status: TodoStatus;
    @Type(() => Date) @IsDate() readonly createdAt: Date;
    @Type(() => Date) @IsDate() readonly completedAt?: Date;
}
