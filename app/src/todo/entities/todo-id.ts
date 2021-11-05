import { UUID } from "utils/uuid";

const brand = Symbol();
export class TodoId extends UUID {
    private [brand]: never;
}
