import { useMemo } from 'preact/hooks';
import { usePagination } from './usePagination';
import { useSorting } from './useSorting';
import { IFilters } from '../models';

export const useParams = (filters: IFilters) => {
    const { sortId, sortType, sorting, setSorting } = useSorting();
    const { setPagination, pagination } = usePagination([filters, sorting]);
    const { pageIndex, pageSize } = pagination;

    const params = useMemo(() => {
        return { pageIndex, pageSize, sortId, sortType, filters };
    }, [pageIndex, pageSize, sortId, sortType, filters]);

    return { params, pagination, setPagination, sorting, setSorting };
};
