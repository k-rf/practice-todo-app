import { makeStyles } from "@material-ui/core";
import { DashBoard } from "./pages/dashboard";
import { Todo } from "./pages/todo";

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.background.default,
        minHeight: "100vh",
        display: "flow-root",
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DashBoard>
                <Todo />
            </DashBoard>
        </div>
    );
};

export default App;
