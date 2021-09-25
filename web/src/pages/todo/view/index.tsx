import { CircularProgress, Container, Grid } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useLoading } from "hooks/use-loading";
import { useTodoCollection } from "../hooks/use-todo-collection";
import { TodoAccordion } from "./todo-accordion";
import { TodoCreateDialogFab } from "./todo-create-dialog-fab";

const styles: SxProps<Theme> = {
    position: "fixed",
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
                        <CircularProgress size={500} />
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
