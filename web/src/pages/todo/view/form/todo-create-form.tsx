import { SxProps, Theme } from "@mui/system";
import { Control, useController } from "react-hook-form";
import { TodoDescriptionField } from "./todo-description-field";
import { TodoTitleField } from "./todo-title-field";

const fieldStyles: SxProps<Theme> = {
    marginBottom: (theme) => theme.spacing(2),
};

export interface FormValues {
    title: string;
    description: string;
}

interface TodoCreateFormProps {
    control: Control<FormValues>;
}

export const TodoCreateForm = (props: TodoCreateFormProps) => {
    const { field: titleField, fieldState: titleFieldState } = useController({
        control: props.control,
        name: "title",
        rules: {
            required: { value: true, message: `必須項目です` },
        },
    });

    const { field: descriptionField } = useController({
        control: props.control,
        name: "description",
    });

    return (
        <>
            <TodoTitleField
                {...titleField}
                required
                fullWidth
                autoFocus
                error={titleFieldState.invalid}
                helperText={titleFieldState.error?.message}
                sx={fieldStyles}
            />
            <TodoDescriptionField
                {...descriptionField}
                fullWidth
                sx={fieldStyles}
            />
        </>
    );
};
