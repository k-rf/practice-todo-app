import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, IsUUID } from "class-validator";
import "reflect-metadata";
import { TodoStatus } from "./todo-status";

export class Todo {
    @Type() @IsUUID() readonly id: string;
    @Type() @IsString() readonly title: string;
    @Type() @IsString() readonly description: string;
    @Type() @IsString() readonly status: TodoStatus;
    @Type(() => Date) @IsDate() readonly createdAt: Date;
    @Type(() => Date) @IsDate() readonly completedAt?: Date;

    @Type() @IsNumber() readonly x: number = 0;
    @Type() @IsNumber() readonly y: number = 0;
    @Type() @IsNumber() readonly w: number = 3;
    @Type() @IsNumber() readonly h: number = 2;
}
