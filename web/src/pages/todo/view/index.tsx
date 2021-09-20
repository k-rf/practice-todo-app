import {
    CircularProgress,
    Container,
    Grid,
    makeStyles,
} from "@material-ui/core";
import { useLoading } from "hooks/use-loading";
import { useTodoCollection } from "../hooks/use-todo-collection";
import { TodoAccordion } from "./todo-accordion";
import { TodoCreateDialogFab } from "./todo-create-dialog-fab";

const useStyles = makeStyles(() => ({
    fab: {
        position: "fixed",
    },
}));

export const Todo = () => {
    const classes = useStyles();

    const { state, action } = useTodoCollection();
    const { isLoading } = useLoading(action.findAll);

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <TodoCreateDialogFab className={classes.fab} />
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
        </>
    );
};
