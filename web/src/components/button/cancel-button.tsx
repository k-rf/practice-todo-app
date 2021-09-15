import { Button } from "@material-ui/core";

interface Props {
    onClose: () => void;
}

export const CancelButton = (props: Props) => {
    return (
        <Button
            color="default"
            variant="outlined"
            onClick={() => {
                props.onClose();
            }}
        >
            キャンセル
        </Button>
    );
};
