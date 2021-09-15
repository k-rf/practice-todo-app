import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1),
    },
}));

interface Props {
    title: string;
}

export const Header = (props: Props) => {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.root}>
            <Toolbar>
                <Typography variant="h4">{props.title}</Typography>
            </Toolbar>
        </AppBar>
    );
};
