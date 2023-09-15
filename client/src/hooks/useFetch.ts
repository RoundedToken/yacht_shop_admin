import { useCallback, useEffect, useState } from 'preact/hooks';

export const useFetch = <T>(endpoint: string): { isLoading: boolean; data: T } => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(undefined);

    const fetchSales = useCallback(async () => {
        const res = await fetch(`http://192.168.1.37:5000/api${endpoint}`);
        const resData = await res.json();
        setData(resData);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchSales();
    }, []);

    return { isLoading, data };
};
