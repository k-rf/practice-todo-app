export const TODO_STATUS = {
    DONE: "DONE",
    PENDING: "PENDING",
} as const;

export type TodoStatus = typeof TODO_STATUS[keyof typeof TODO_STATUS];
