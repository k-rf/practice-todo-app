import { useEffect, useState } from "react";

export const useLoading = (action: CallableFunction) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let done = false;

        if (!done) {
            setIsLoading(true);
            (async () => {
                try {
                    await action();
                } catch (e) {
                    setError(String(e));
                } finally {
                    setIsLoading(false);
                }
            })();
        }

        return () => {
            done = true;
        };
    }, [action]);

    return { isLoading, error };
};
