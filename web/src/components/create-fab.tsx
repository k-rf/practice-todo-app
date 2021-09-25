import { Edit } from "@mui/icons-material";
import { Fab, FabProps } from "@mui/material";

export type CreateFabProps = Omit<FabProps, "children">;

export const CreateFab = (props: CreateFabProps) => {
    return (
        <Fab {...props} color="secondary" onClick={props.onClick}>
            <Edit fontSize="large" />
        </Fab>
    );
};
