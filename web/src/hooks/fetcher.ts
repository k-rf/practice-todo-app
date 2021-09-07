import useSWR from "swr";

export const fetcher = (...args: any) =>
    fetch(...args).then((res) => res.json());

export const useFetch = (uri: string) => {
    const { data, error } = useSWR(uri, fetcher);

    return [data, error];
};
