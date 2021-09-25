import { useEffect, useState } from "react";
import { useSnackbar } from "./use-snackbar";

export const useLoading = (action: CallableFunction) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { action: snackbarAction } = useSnackbar();

    useEffect(() => {
        let done = false;

        if (!done) {
            setIsLoading(true);
            (async () => {
                try {
                    await action();
                } catch (e) {
                    if (e instanceof Error) {
                        setError(String(e.message));
                        snackbarAction.alert(String(e.message));
                    } else {
                        setError(String(e));
                    }
                } finally {
                    setIsLoading(false);
                }
            })();
        }

        return () => {
            done = true;
        };
    }, [action, snackbarAction]);

    return { isLoading, error };
};
