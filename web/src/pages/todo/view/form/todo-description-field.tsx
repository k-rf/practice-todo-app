import { TextField, TextFieldProps } from "@mui/material";

type TodoDescriptionFieldProps = Omit<
    TextFieldProps,
    "label" | "multiline" | "minRows" | "variant"
>;

export const TodoDescriptionField = (props: TodoDescriptionFieldProps) => {
    return (
        <TextField
            {...props}
            label="詳細"
            multiline
            minRows={2}
            variant="outlined"
        />
    );
};
