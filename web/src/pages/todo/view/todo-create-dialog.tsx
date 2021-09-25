import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { CancelButton } from "components/button/cancel-button";
import { SaveButton } from "components/button/save-button";
import { MouseEventHandler } from "react";
import { useForm } from "react-hook-form";
import { useTodoCollection } from "../hooks/use-todo-collection";

const fieldStyles: SxProps<Theme> = {
    marginBottom: (theme) => theme.spacing(2),
};

interface Inputs {
    title: string;
    description: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
}

export const TodoCreateDialog = (props: Props) => {
    const { action } = useTodoCollection();
    const { handleSubmit, register, reset } = useForm<Inputs>();

    const handleClose = () => {
        reset({ title: "", description: "" });
        props.onClose();
    };

    const handleSave: MouseEventHandler<HTMLButtonElement> | undefined = (
        e,
    ) => {
        handleSubmit((data) => {
            action.create({ ...data });
        })(e);
        handleClose();
    };

    return (
        <Dialog
            open={props.open}
            onClose={(_, reason) => {
                if (reason === "escapeKeyDown") {
                    handleClose();
                }
            }}
        >
            <DialogTitle>Todo を追加する</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ p: (theme) => theme.spacing(1) }}>
                    <TextField
                        label="タイトル"
                        fullWidth
                        variant="outlined"
                        sx={fieldStyles}
                        {...register("title")}
                    />
                    <TextField
                        label="詳細"
                        multiline
                        minRows={2}
                        fullWidth
                        variant="outlined"
                        sx={fieldStyles}
                        {...register("description")}
                    />
                </DialogContentText>
                <DialogActions>
                    <CancelButton onClick={handleClose} />
                    <SaveButton onClick={handleSave} />
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
