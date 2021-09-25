import { useCallback, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { TodoApiAdapter } from "../api-adapter/todo-api-adapter";
import { TodoCollection } from "../model/todo-collection";

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
        async (props: { title: string; description: string }) => {
            const result = await new TodoApiAdapter().create({
                ...props,
                createdAt: new Date(),
            });

            setTodoCollection((old) => old.append(result));
        },
        [setTodoCollection],
    );

    return {
        state: todoCollection,
        action: useMemo(
            () => ({
                findAll,
                create,
            }),
            [findAll, create],
        ),
    };
};
