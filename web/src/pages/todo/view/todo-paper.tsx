import { Box, Checkbox, Paper, Typography } from "@mui/material";
import { RemoveIconButton } from "components/remove-icon-button";
import { useSnackbar } from "hooks/use-snackbar";
import { MouseEventHandler } from "react";
import { useTodoCollection } from "../hooks/use-todo-collection";
import { TodoStatus } from "../model/todo-status";

interface Props {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    status: TodoStatus;
    completedAt?: Date;
    onMouseEnter?: MouseEventHandler<HTMLDivElement> | undefined;
    onMouseLeave?: MouseEventHandler<HTMLDivElement> | undefined;
    hover?: boolean | undefined;
}

export const TodoPaper = (props: Props) => {
    const { action } = useTodoCollection();
    const { action: snackbarAction } = useSnackbar();

    const handleRemove = () => {
        action
            .remove({ id: props.id })
            .then(() => {
                snackbarAction.success(`Todo を削除しました`);
            })
            .catch((e) => {
                if (e instanceof Error) {
                    snackbarAction.alert(e.message);
                }
            });
    };

    const handleChangeStatus = () => {
        const nextStatus = props.status === "DONE" ? "PENDING" : "DONE";
        action.changeStatus({ id: props.id, status: nextStatus }).catch((e) => {
            if (e instanceof Error) {
                snackbarAction.alert(e.message);
            }
        });
    };

    return (
        <Paper
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            sx={{ height: "100%" }}
        >
            <Box
                p={(theme) => theme.spacing(1)}
                height={(theme) => theme.spacing(5)}
                display="flex"
            >
                <Checkbox
                    size="small"
                    checked={props.status === "DONE"}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleChangeStatus();
                    }}
                />
                <Typography
                    sx={{
                        alignSelf: "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {props.title}
                </Typography>
                <Box flexGrow={1} />
                {props.hover && <RemoveIconButton onClick={handleRemove} />}
            </Box>
        </Paper>
    );
};
