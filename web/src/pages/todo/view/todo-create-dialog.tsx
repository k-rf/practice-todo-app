import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField,
} from "@material-ui/core";
import { CancelButton } from "components/button/cancel-button";
import { SaveButton } from "components/button/save-button";
import { MouseEventHandler } from "react";
import { useForm } from "react-hook-form";
import { useTodoCollection } from "../hooks/use-todo-collection";

const useStyles = makeStyles((theme) => ({
    field: {
        marginBottom: theme.spacing(2),
    },
}));

interface Inputs {
    title: string;
    description: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
}

export const TodoCreateDialog = (props: Props) => {
    const classes = useStyles();

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
                <DialogContentText>
                    <TextField
                        className={classes.field}
                        label="タイトル"
                        fullWidth
                        variant="outlined"
                        {...register("title")}
                    />
                    <TextField
                        className={classes.field}
                        label="詳細"
                        multiline
                        minRows={2}
                        fullWidth
                        variant="outlined"
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
