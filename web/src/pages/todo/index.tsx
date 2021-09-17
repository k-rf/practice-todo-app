import { CircularProgress, Container, Grid } from "@material-ui/core";
import { useTodoCollection } from "./hooks/use-todo-collection";
import { TodoAccordion } from "./todo-accordion";
import { TodoCreateDialogFab } from "./todo-create-dialog-fab";

export const Todo = () => {
    const { todoCollection, isLoading } = useTodoCollection();

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <TodoCreateDialogFab />
                    </Grid>
                    <Grid item xs>
                        {todoCollection.value.slice(0, 100).map((e) => (
                            <TodoAccordion key={e.id} {...e} />
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
