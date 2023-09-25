import { PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'preact/hooks';

export const usePagination = (deps: any[] = []) => {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 25,
    });

    const pagination = { pageIndex, pageSize };

    useEffect(() => {
        setPagination((prev) => {
            const newP = { ...prev };
            newP.pageIndex = 0;
            return newP;
        });
    }, [...deps]);

    return { pagination, setPagination };
};
