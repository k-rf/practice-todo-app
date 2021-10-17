import { useCallback, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { TodoApiAdapter } from "../api-adapter/todo-api-adapter";
import { Todo } from "../model/todo";
import { TodoCollection } from "../model/todo-collection";
import { TodoStatus } from "../model/todo-status";

interface CreateProps {
    title: string;
    description: string;
}

interface RemoveProps {
    id: string;
}

interface ChangeStatusProps {
    id: string;
    status: TodoStatus;
}

const todoCollectionState = atom<TodoCollection>({
    key: "todoCollectionState",
    default: new TodoCollection(),
});

export const useTodoCollection = () => {
    const [todoCollection, setTodoCollection] =
        useRecoilState(todoCollectionState);

    const findAll = useCallback(async () => {
        const result = await new TodoApiAdapter().findAll();

        setTodoCollection(result);
    }, [setTodoCollection]);

    const create = useCallback(
        async (props: CreateProps) => {
            const result = await new TodoApiAdapter().create({
                ...props,
                createdAt: new Date(),
            });

            setTodoCollection((old) => old.append(result));
        },
        [setTodoCollection],
    );

    const remove = useCallback(
        async (props: RemoveProps) => {
            await new TodoApiAdapter().remove(props);
            setTodoCollection((old) => old.remove(props.id));
        },
        [setTodoCollection],
    );

    const changeStatus = useCallback(
        async (props: ChangeStatusProps) => {
            const response = await new TodoApiAdapter().changeStatus(props);
            setTodoCollection((old) => old.update(response));
        },
        [setTodoCollection],
    );

    const changeLayout = useCallback(
        async (props: Todo) => {
            setTodoCollection((old) => old.update(props));
        },
        [setTodoCollection],
    );

    return {
        state: todoCollection,
        action: useMemo(
            () => ({
                findAll,
                create,
                remove,
                changeStatus,
                changeLayout,
            }),
            [findAll, create, remove, changeStatus, changeLayout],
        ),
    };
};
