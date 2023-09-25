import { createColumnHelper } from '@tanstack/react-table';
import { IFilters, TInfoProduct, TUpdateFilter } from '../../../models';
import { getPrice } from '../../../utils/getPrice';
import styles from '../Table.module.css';

const columnHelper = createColumnHelper<TInfoProduct>();

export const columnsProducts = (updateFilter: TUpdateFilter, filters: IFilters) => {
    return [
        columnHelper.accessor('id', {
            id: 'Id',
            header: 'Id',
            cell: (info) => (
                <a
                    style={filters.product === info.getValue() && { color: 'green' }}
                    href={`https://yachtshop.ee/product/${info.getValue()}`}
                    target="_blank"
                >
                    {info.getValue()}
                </a>
            ),
        }),
        columnHelper.accessor('name', {
            id: 'Name',
            header: 'Name',
            cell: (info) => (
                <div
                    className={styles.productNameCell}
                    onClick={() => updateFilter('product', info.row.original.id)}
                >
                    {info.getValue()}
                </div>
            ),
        }),
        columnHelper.accessor('ordersCount', {
            id: 'Orders\nCount',
            header: 'Orders\nCount',
        }),
        columnHelper.accessor('totalCount', {
            id: 'Total\nCount',
            header: 'Total\nCount',
        }),
        columnHelper.accessor('minPrice', {
            id: 'Min\nPrice',
            header: 'Min\nPrice',
            cell: (info) => getPrice(info.getValue()),
        }),
        columnHelper.accessor('maxPrice', {
            id: 'Max\nPrice',
            header: 'Max\nPrice',
            cell: (info) => getPrice(info.getValue()),
        }),
        columnHelper.accessor('avgPrice', {
            id: 'Avg\nPrice',
            header: 'Avg\nPrice',
            cell: (info) => getPrice(info.getValue()),
        }),
        columnHelper.accessor('totalSum', {
            id: 'Total\nSum',
            header: 'Total\nSum',
            cell: (info) => getPrice(info.getValue()),
        }),
    ];
};
