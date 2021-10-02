import { Delete } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";

export type RemoveFabProps = Omit<IconButtonProps, "children">;

export const RemoveIconButton = (props: RemoveFabProps) => {
    return (
        <IconButton {...props} color="error" size="medium">
            <Delete fontSize="medium" />
        </IconButton>
    );
};
