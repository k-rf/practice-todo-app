import { Fab } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { MouseEventHandler } from "react";

interface Props {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const CreateFab = (props: Props) => {
    return (
        <Fab
            style={{ margin: 8, position: "fixed" }}
            color="secondary"
            onClick={props.onClick}
        >
            <Edit fontSize="large" />
        </Fab>
    );
};
