export const fetcher = (option: {}) => (uri: string) =>
    fetch(uri, { ...option, mode: "cors" }).then((res) => res.json());
