import { CreateFab, Props } from "components/create-fab";
import { useState } from "react";
import { TodoCreateDialog } from "./todo-create-dialog";

export const TodoCreateDialogFab = (props: Props) => {
    const [opened, setOpened] = useState(false);

    const handleOpen = () => {
        setOpened(true);
    };

    const handelClose = () => {
        setOpened(false);
    };

    return (
        <>
            <CreateFab
                classes={props.classes}
                className={props.className}
                onClick={() => handleOpen()}
            />
            <TodoCreateDialog open={opened} onClose={handelClose} />
        </>
    );
};
