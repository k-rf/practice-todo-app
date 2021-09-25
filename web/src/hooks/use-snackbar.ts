import { AlertColor } from "@mui/material";
import { useCallback, useMemo } from "react";
import { atom, useRecoilState } from "recoil";

interface SnackbarProps {
    opened: boolean;
    message: string;
    severity: AlertColor;
}

const snackbarState = atom<SnackbarProps>({
    key: "snackbarState",
    default: {
        opened: false,
        message: "",
        severity: "success",
    },
});

export const useSnackbar = () => {
    const [snackbar, setSnackbar] = useRecoilState(snackbarState);

    const open = useCallback(() => {
        setSnackbar((old) => ({ ...old, opened: true }));
    }, [setSnackbar]);

    const close = useCallback(() => {
        setSnackbar((old) => ({ ...old, opened: false }));
    }, [setSnackbar]);

    const alert = useCallback(
        (value: string) => {
            setSnackbar((old) => ({
                ...old,
                opened: true,
                message: value,
                severity: "error",
            }));
        },
        [setSnackbar],
    );

    const success = useCallback(
        (value: string) => {
            setSnackbar((old) => ({
                ...old,
                opened: true,
                message: value,
                severity: "success",
            }));
        },
        [setSnackbar],
    );

    return {
        state: snackbar,
        action: useMemo(
            () => ({
                open,
                close,
                alert,
                success,
            }),
            [open, close, alert, success],
        ),
    };
};
