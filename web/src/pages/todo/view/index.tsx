import { Box, CircularProgress, Container } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useLoading } from "hooks/use-loading";
import { useTodoCollection } from "../hooks/use-todo-collection";
import { TodoCreateDialogFab } from "./todo-create-dialog-fab";
import { TodoGridLayout } from "./todo-grid-layout";

const fabStyles: SxProps<Theme> = {
    position: "fixed",
    bottom: (theme) => theme.spacing(4),
    zIndex: 10_000,
};

const progressStyles: SxProps<Theme> = {
    display: "flex",
    justifyContent: "center",
};

export const Todo = () => {
    const { state, action } = useTodoCollection();
    const { isLoading } = useLoading(action.findAll);

    return (
        <>
            <Box display="flex" justifyContent="center">
                <TodoCreateDialogFab sx={fabStyles} />
            </Box>
            <Container maxWidth="md">
                {isLoading ? (
                    <Box sx={progressStyles}>
                        <CircularProgress size={56} />
                    </Box>
                ) : (
                    <TodoGridLayout collection={state} />
                )}
            </Container>
        </>
    );
};
