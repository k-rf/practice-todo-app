import { TextField, TextFieldProps } from "@mui/material";

type TodoTitleFieldProps = Omit<
    TextFieldProps,
    "label" | "autoComplete" | "variant"
>;

export const TodoTitleField = (props: TodoTitleFieldProps) => {
    return (
        <TextField
            {...props}
            placeholder="なにをしようかな？"
            autoComplete="off"
            variant="outlined"
        />
    );
};
