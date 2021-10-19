import { Box, CircularProgress, Container, Paper, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { useLoading } from "hooks/use-loading";
import { useTodoCollection } from "../hooks/use-todo-collection";
import { TodoQuickCreateForm } from "./form/todo-quick-create-form";
import { TodoGridLayout } from "./todo-grid-layout";

const formStyles: SxProps<Theme> = {
    position: "fixed",
    bottom: (theme) => theme.spacing(0),
    backgroundColor: (theme) => theme.palette.background.paper,
    zIndex: 10_000,
};

const paperStyles: SxProps<Theme> = {
    padding: (theme) => theme.spacing(2, 2, 0, 2),
    width: (theme) => theme.spacing(80),
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
            <Container
                maxWidth="md"
                sx={{ paddingBottom: (theme) => theme.spacing(16) }}
            >
                {isLoading ? (
                    <Box sx={progressStyles}>
                        <CircularProgress size={56} />
                    </Box>
                ) : (
                    <TodoGridLayout collection={state} />
                )}
            </Container>
            <Box position="fixed" bottom={0} display="flex" width="100%">
                <Box flexGrow={1} />
                <Paper sx={paperStyles}>
                    <TodoQuickCreateForm />
                </Paper>
                <Box flexGrow={1} />
            </Box>
        </>
    );
};
