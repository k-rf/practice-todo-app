import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
    colorTransparent: {
        backgroundColor: "#00000080",
        color: "antiquewhite",
    },
}));

interface Props {
    title: string;
}

export const Header = (props: Props) => {
    const classes = useStyles();

    return (
        <AppBar position="sticky" color="transparent" classes={classes}>
            <Toolbar>
                <Typography variant="h4">{props.title}</Typography>
            </Toolbar>
        </AppBar>
    );
};
