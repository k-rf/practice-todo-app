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
import { SubmitHandler, useForm } from "react-hook-form";

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

    const { handleSubmit, register, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    const defaultValues = { title: "", description: "" };

    const handleSave: MouseEventHandler<HTMLButtonElement> | undefined = (
        e,
    ) => {
        handleSubmit(onSubmit)(e);
        reset(defaultValues);
        props.onClose();
    };

    return (
        <Dialog
            open={props.open}
            onClose={(_, reason) => {
                if (reason === "escapeKeyDown") {
                    props.onClose();
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
                    <CancelButton onClick={props.onClose} />
                    <SaveButton onClick={handleSave} />
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
