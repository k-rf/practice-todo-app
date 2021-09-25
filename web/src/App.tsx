import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { DashBoard } from "./pages/dashboard";
import { Todo } from "./pages/todo/view";
import { Snackbar } from "components/snackbar";

const styles: SxProps<Theme> = {
    background: "linear-gradient(45deg, #12c2e9, #c471ed, #f64f59);",
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
