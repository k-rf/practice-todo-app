import { Fab, FabProps } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

export type Props = Omit<FabProps, "children">;

export const CreateFab = (props: Props) => {
    return (
        <Fab
            classes={props.classes}
            className={props.className}
            color="secondary"
            onClick={props.onClick}
        >
            <Edit fontSize="large" />
        </Fab>
    );
};
