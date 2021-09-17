import { CreateFab } from "components/create-fab";
import { TodoCreateDialog } from "pages/todo/todo-create-dialog";
import { useState } from "react";

export const TodoCreateDialogFab = () => {
    const [opened, setOpened] = useState(false);

    const handleOpen = () => {
        setOpened(true);
    };

    const handelClose = () => {
        setOpened(false);
    };

    return (
        <>
            <CreateFab onClick={() => handleOpen()} />
            <TodoCreateDialog open={opened} onClose={handelClose} />
        </>
    );
};
