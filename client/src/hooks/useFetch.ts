import { useCallback, useEffect, useState } from 'preact/hooks';

export const useFetch = <T>(
    endpoint: string,
    params: Record<string, any> = {}
): { isLoading: boolean; data: T; isError: boolean } => {
    const paramsStr = Object.entries(params)
        .map((p) => {
            if (typeof p[1] === 'object') {
                const newP = { ...p[1], ['status']: Array.from(p[1].status) };
                return `${p[0]}=${JSON.stringify(newP)}`;
            }
            return `${p[0]}=${p[1]}`;
        })
        .join('&');

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const [isError, setIsError] = useState<boolean>(false);

    const fetchSales = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}/?${paramsStr}`);
            const resData = await res.json();
            setData(resData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError(true);
        }
    }, [params]);

    useEffect(() => {
        setIsLoading(true);
        fetchSales();
    }, [params]);

    return { isLoading, data, isError };
};
