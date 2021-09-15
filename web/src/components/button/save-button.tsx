import { Button } from "@material-ui/core";

interface Props {
    onClose: () => void;
}

export const SaveButton = (props: Props) => {
    return (
        <Button
            color="primary"
            variant="outlined"
            onClick={() => {
                props.onClose();
            }}
        >
            保存する
        </Button>
    );
};
