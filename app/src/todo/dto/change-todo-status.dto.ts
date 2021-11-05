import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { UUID } from "utils/uuid";

interface Props {
    id: UUID;
    status: "DONE" | "PENDING";
}
export class ChangeTodoStatusDto {
    @Type(() => UUID) readonly id: UUID;
    @Type() @IsString() readonly status: "DONE" | "PENDING";

    private constructor(props?: Props) {
        // class-transformer 対策
        if (props) {
            this.id = props.id;
            this.status = props.status;
        }
    }

    static of(propsOverridden?: Partial<Props>) {
        return new ChangeTodoStatusDto({
            id: new UUID(),
            status: "PENDING",
            ...propsOverridden,
        });
    }
}
