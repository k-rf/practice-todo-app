import { Edit } from "@mui/icons-material";
import { Fab, FabProps } from "@mui/material";

export type CreateFabProps = Omit<FabProps, "children">;

export const CreateFab = (props: CreateFabProps) => {
    return (
        <Fab {...props} color="secondary">
            <Edit fontSize="large" />
        </Fab>
    );
};
