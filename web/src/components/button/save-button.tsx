import { Button, ButtonProps } from "@mui/material";

export const SaveButton = (props: ButtonProps) => {
    return (
        <Button color="primary" variant="outlined" {...props}>
            保存する
        </Button>
    );
};
