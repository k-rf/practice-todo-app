import { Button, ButtonProps } from "@material-ui/core";

export const SaveButton = (props: ButtonProps) => {
    return (
        <Button color="primary" variant="outlined" {...props}>
            保存する
        </Button>
    );
};
