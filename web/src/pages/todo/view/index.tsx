import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useLoading } from "hooks/use-loading";
import { useTodoCollection } from "../hooks/use-todo-collection";
import { TodoAccordion } from "./todo-accordion";
import { TodoCreateDialogFab } from "./todo-create-dialog-fab";

const styles: SxProps<Theme> = {
    position: "fixed",
};

const progressStyles: SxProps<Theme> = {
    display: "flex",
    justifyContent: "center",
};

export const Todo = () => {
    const { state, action } = useTodoCollection();
    const { isLoading } = useLoading(action.findAll);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={1}>
                    <TodoCreateDialogFab sx={styles} />
                </Grid>
                <Grid item xs>
                    {isLoading ? (
                        <Box sx={progressStyles}>
                            <CircularProgress size={56} />
                        </Box>
                    ) : (
                        state.value.map((e) => (
                            <TodoAccordion key={e.id} {...e} />
                        ))
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
