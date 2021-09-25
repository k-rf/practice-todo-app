import { CreateFab, CreateFabProps } from "components/create-fab";
import { useState } from "react";
import { TodoCreateDialog } from "./todo-create-dialog";

export const TodoCreateDialogFab = (props: CreateFabProps) => {
    const [opened, setOpened] = useState(false);

    const handleOpen = () => {
        setOpened(true);
    };

    const handelClose = () => {
        setOpened(false);
    };

    return (
        <>
            <CreateFab {...props} onClick={() => handleOpen()} />
            <TodoCreateDialog open={opened} onClose={handelClose} />
        </>
    );
};
