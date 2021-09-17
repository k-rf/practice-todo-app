import { plainToClass } from "class-transformer";
import { Todo } from "../model/todo";

// 実験
export const useTodo = () => {
    const create = (props: { title: string }) => {
        return plainToClass(Todo, props);
    };

    return [create];
};

// const title = `todo-title-${new Date().toDateString()}`;
// const description = `todo-description-${new Date().toDateString()}`;
// const createdAt = new Date();

// postFetcher({
//     title,
//     description,
//     createdAt,
// })("/todo")
//     .then((res) => res.json())
//     .then((data) =>
//         mutate((c) => {
//             c?.value.push(
//                 plainToClass(TodoModel, {
//                     id: data.id,
//                     title,
//                     description,
//                     createdAt,
//                 }),
//             );
//             return c;
//         }),
//     );
