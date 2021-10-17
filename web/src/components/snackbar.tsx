import { Alert, Snackbar as MuiSnackbar } from "@mui/material";
import { useSnackbar } from "hooks/use-snackbar";

export const Snackbar = () => {
    const { state, action } = useSnackbar();

    return (
        <MuiSnackbar
            open={state.opened}
            onClose={action.close}
            autoHideDuration={3_000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert severity={state.severity}>{state.message}</Alert>
        </MuiSnackbar>
    );
};
