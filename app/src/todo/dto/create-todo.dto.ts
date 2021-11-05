import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

interface Props {
    title: string;
    description: string;
    createdAt: Date;
    due?: Date;
    completedAt?: Date;
    x: number;
    y: number;
    w: number;
    h: number;
}
export class CreateTodoDto {
    @Type() @IsString() readonly title: string;
    @Type() @IsOptional() @IsString() readonly description: string;
    @Type() @IsDate() readonly createdAt: Date;
    @Type() @IsOptional() @IsDate() readonly due?: Date;
    @Type() @IsOptional() @IsDate() readonly completedAt?: Date;
    @Type() @IsNumber() readonly x: number;
    @Type() @IsNumber() readonly y: number;
    @Type() @IsNumber() readonly w: number;
    @Type() @IsNumber() readonly h: number;

    private constructor(props?: Props) {
        // class-transformer 対策
        if (props) {
            this.title = props.title;
            this.description = props.description;
            this.createdAt = props.createdAt;
            this.due = props.due;
            this.completedAt = props.completedAt;
            this.x = props.x;
            this.y = props.y;
            this.w = props.w;
            this.h = props.h;
        }
    }

    static of(propsOverridden?: Partial<Props>) {
        return new CreateTodoDto({
            title: "default",
            description: "default",
            createdAt: new Date(),
            due: new Date(),
            completedAt: new Date(),
            x: 0,
            y: 0,
            w: 3,
            h: 2,
            ...propsOverridden,
        });
    }
}
