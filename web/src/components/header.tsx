import { AppBar, Toolbar, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

const styles: SxProps<Theme> = {
    backgroundColor: "#00000080",
    color: "antiquewhite",
    marginBottom: (theme) => theme.spacing(2),
};

interface HeaderProps {
    title: string;
}

export const Header = (props: HeaderProps) => {
    return (
        <AppBar position="sticky" color="transparent" sx={styles}>
            <Toolbar>
                <Typography variant="h4">{props.title}</Typography>
            </Toolbar>
        </AppBar>
    );
};
