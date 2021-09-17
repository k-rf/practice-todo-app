import { plainToClass } from "class-transformer";
import useSWR from "swr";
import { TodoCollection } from "../model/todo-collection";

export const useTodoCollection = () => {
    const { data, error, mutate } = useSWR<TodoCollection>(
        import.meta.env.VITE_BASE_URI + "/todo",
        (uri: string) =>
            fetch(uri)
                .then((res) => res.json())
                .then((data) =>
                    plainToClass(TodoCollection, {
                        value: data,
                    }),
                ),
    );

    return {
        todoCollection: data ?? new TodoCollection(),
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
