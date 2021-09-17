import { Button, ButtonProps } from "@material-ui/core";

export const CancelButton = (props: ButtonProps) => {
    return (
        <Button color="default" variant="outlined" {...props}>
            キャンセル
        </Button>
    );
};
