import { SortingState } from '@tanstack/react-table';
import { useEffect, useState } from 'preact/hooks';

export const useSorting = () => {
    const [sorting, setSorting] = useState<SortingState>([{ id: 'Id', desc: true }]);
    const sortId = sorting.length === 0 ? 'Id' : sorting[0].id;
    const sortType = sorting.length === 0 ? 'DESC' : sorting[0].desc ? 'DESC' : 'ASC';

    useEffect(() => {
        if (sorting.length === 0) {
            setSorting([{ id: 'Id', desc: true }]);
        }
    }, [sorting]);

    return { sortId, sortType, sorting, setSorting };
};
