import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
} from "@mui/material";
import { CancelButton } from "components/button/cancel-button";
import { SaveButton } from "components/button/save-button";
import { useSnackbar } from "hooks/use-snackbar";
import { MouseEventHandler } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTodoCollection } from "../hooks/use-todo-collection";
import { FormValues, TodoCreateForm } from "./form/todo-create-form";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const TodoCreateDialog = (props: Props) => {
    const { action } = useTodoCollection();
    const { action: snackbarAction } = useSnackbar();
    const { handleSubmit, reset, control, formState } = useForm<FormValues>({
        mode: "all",
    });

    const onClose = () => {
        reset({ title: "", description: "" });
        props.onClose();
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        action
            .create({ ...data })
            .then(() => {
                snackbarAction.success(`Todo を作成しました`);
            })
            .catch((e) => {
                if (e instanceof Error) {
                    snackbarAction.alert(e.message);
                }
            });
        onClose();
    };

    const handleDialogClose: DialogProps["onClose"] = (event, reason) => {
        if (reason === "escapeKeyDown") {
            onClose();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleSave: MouseEventHandler<HTMLButtonElement> | undefined = (
        e,
    ) => {
        handleSubmit(onSubmit)(e);
    };

    return (
        <Dialog open={props.open} onClose={handleDialogClose}>
            <DialogTitle>Todo を追加する</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ p: (theme) => theme.spacing(1) }}>
                    <TodoCreateForm control={control} />
                </DialogContentText>
                <DialogActions>
                    <CancelButton onClick={handleCancel} />
                    <SaveButton
                        onClick={handleSave}
                        disabled={!formState.isValid}
                    />
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
