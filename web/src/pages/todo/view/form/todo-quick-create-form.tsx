import { SxProps, Theme } from "@mui/system";
import { useSnackbar } from "hooks/use-snackbar";
import { useTodoCollection } from "pages/todo/hooks/use-todo-collection";
import { KeyboardEventHandler } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { TodoTitleField } from "./todo-title-field";

const fieldStyles: SxProps<Theme> = {
    marginBottom: (theme) => theme.spacing(2),
};

export interface FormValues {
    title: string;
}

export const TodoQuickCreateForm = () => {
    const { state, action } = useTodoCollection();
    const { action: snackbarAction } = useSnackbar();

    const { handleSubmit, reset, control } = useForm<FormValues>({
        mode: "onSubmit",
    });

    const { field: titleField, fieldState: titleFieldState } = useController({
        control,
        name: "title",
        rules: {
            required: { value: true, message: `必須項目です` },
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const { x, y } = state.nextPosition();

        action
            .create({ ...data, x, y })
            .then(() => {
                snackbarAction.success(`Todo を作成しました`);
            })
            .catch((e) => {
                if (e instanceof Error) {
                    snackbarAction.alert(e.message);
                }
            });
    };

    const handleSave: KeyboardEventHandler<HTMLDivElement> | undefined = (
        e,
    ) => {
        handleSubmit(onSubmit)(e);
        reset({ title: "" });
    };

    return (
        <TodoTitleField
            {...titleField}
            fullWidth
            autoFocus
            error={titleFieldState.invalid}
            helperText={"Ctrl + Enter で追加する"}
            FormHelperTextProps={{ style: { marginLeft: "auto" } }}
            onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                    handleSave(e);
                }
            }}
            sx={fieldStyles}
        />
    );
};
