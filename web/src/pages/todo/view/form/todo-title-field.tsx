import { TextField, TextFieldProps } from "@mui/material";

type TodoTitleFieldProps = Omit<
    TextFieldProps,
    "label" | "requtired" | "autoComplete" | "variant"
>;

export const TodoTitleField = (props: TodoTitleFieldProps) => {
    return (
        <TextField
            {...props}
            label="タイトル"
            required
            autoComplete="off"
            variant="outlined"
        />
    );
};
