import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { DashBoard } from "./pages/dashboard";
import { Todo } from "./pages/todo/view";

const styles: SxProps<Theme> = {
    background: (theme) => theme.palette.background.default,
    minHeight: "100vh",
};

const App = () => {
    return (
        <Box sx={styles}>
            <DashBoard>
                <Todo />
            </DashBoard>
        </Box>
    );
};

export default App;
