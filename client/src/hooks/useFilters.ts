import { useCallback, useMemo, useState } from 'preact/hooks';
import { IFilters, TUpdateDateFrom, TUpdateDateTo, TUpdateFilter, TUpdateStatus } from '../models';

export const useFilters = () => {
    const dateNow = new Date(Date.now()).toISOString().slice(0, 10);
    const [filters, setFilters] = useState<IFilters>({
        dateFrom: null,
        dateTo: dateNow,
        payType: null,
        status: new Set([1, -1]),
        isPaid: null,
        product: null,
        client: null,
    });

    const status = useMemo(() => filters.status, [filters.status]);
    const product = useMemo(() => filters.product, [filters.product]);
    const dateFrom = useMemo(() => filters.dateFrom ?? '', [filters.dateFrom]);
    const dateTo = useMemo(() => filters.dateTo ?? '', [filters.dateTo]);

    const updateFilter: TUpdateFilter = useCallback((key, value) => {
        setFilters((prevFilters) => {
            return { ...prevFilters, [key]: value };
        });
    }, []);

    const updateDateFrom: TUpdateDateFrom = useCallback((date, isShortcut = false) => {
        setFilters((prevFilters) => {
            if (isShortcut)
                return {
                    ...prevFilters,
                    dateFrom: date?.slice(0, 10) || null,
                    dateTo: dateNow,
                };
            else return { ...prevFilters, dateFrom: date?.slice(0, 10) || null };
        });
    }, []);

    const updateDateTo: TUpdateDateTo = useCallback((date) => {
        setFilters((prevFilters) => {
            return { ...prevFilters, dateTo: date?.slice(0, 10) || null };
        });
    }, []);

    const updateStatus: TUpdateStatus = useCallback(
        (value, isAdd) => {
            const newSet = new Set(filters.status);
            isAdd ? newSet.add(value) : newSet.delete(value);

            setFilters((prevFilters) => {
                return { ...prevFilters, status: newSet };
            });
        },
        [filters]
    );

    return {
        filters,
        updateFilter,
        updateStatus,
        status,
        product,
        dateFrom,
        dateTo,
        updateDateFrom,
        updateDateTo,
    };
};
