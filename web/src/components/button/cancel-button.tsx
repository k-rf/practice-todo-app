import { Button, ButtonProps } from "@mui/material";

export const CancelButton = (props: ButtonProps) => {
    return (
        <Button color="inherit" variant="outlined" {...props}>
            キャンセル
        </Button>
    );
};
