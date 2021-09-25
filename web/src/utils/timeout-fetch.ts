type Ok = Response;
type Err = string;
type Result = Ok | Err;

export const timeoutFetch = async (
    input: RequestInfo,
    init?: RequestInit & { timeout?: number },
): Promise<Result> => {
    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, init?.timeout ?? 5_000);

    try {
        const response = await fetch(input, {
            ...init,
            signal: controller.signal,
        });

        return response;
    } catch (error) {
        return String(error);
    } finally {
        clearTimeout(timer);
    }
};

export const isOk = (result: Result): result is Ok => {
    return result instanceof Response;
};
