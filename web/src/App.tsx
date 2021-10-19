import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { DashBoard } from "./pages/dashboard";
import { Todo } from "./pages/todo/view";
import { Snackbar } from "components/snackbar";

const styles: SxProps<Theme> = {
    background: "linear-gradient(315deg, #c9d6ff, #e2e2e2)",
    minHeight: "100vh",
};

const App = () => {
    return (
        <Box sx={styles}>
            <DashBoard>
                <Todo />
            </DashBoard>
            <Snackbar />
        </Box>
    );
};

export default App;
