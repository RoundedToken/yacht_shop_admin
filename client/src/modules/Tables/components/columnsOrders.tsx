import { createColumnHelper } from '@tanstack/react-table';
import { TOrder } from '../../../models';
import { getDate } from '../../../utils/getDate';
import { getPrice } from '../../../utils/getPrice';

const columnHelper = createColumnHelper<TOrder>();
export const columnsOrders = [
    columnHelper.accessor('id', {
        id: 'Id',
        header: 'Id',
        cell: (info) => (
            <a
                style={
                    info.row.original.isPaid
                        ? { backgroundColor: 'rgba(37, 178, 37, 0.531)' }
                        : { backgroundColor: 'brown' }
                }
                href={`/order/${info.getValue()}`}
                target="_blank"
            >
                {info.getValue()}
            </a>
        ),
    }),
    columnHelper.accessor('date', {
        id: 'Date',
        header: 'Date',
        cell: (info) => getDate(info.getValue()),
    }),
    columnHelper.accessor('paidSum', {
        id: 'Paid\nSum',
        header: 'Paid\nSum',
        cell: (info) => (
            <div
                style={
                    info.row.original.allSum?.toFixed(2) === info.getValue()?.toFixed(2)
                        ? {}
                        : { backgroundColor: 'brown' }
                }
            >
                {info.getValue() === null ? '' : getPrice(info.getValue())}
            </div>
        ),
    }),
    columnHelper.accessor('allSum', {
        id: 'All\nSum',
        header: 'All\nSum',
        cell: (info) => getPrice(info.getValue()),
    }),
    columnHelper.accessor('positionCount', {
        id: 'Position\nCount',
        header: 'Position\nCount',
    }),
    columnHelper.accessor('productsCount', {
        id: 'Products\nCount',
        header: 'Products\nCount',
    }),
    columnHelper.accessor('productsSum', {
        id: 'Products\nSum',
        header: 'Products\nSum',
        cell: (info) => getPrice(info.getValue()),
    }),
    columnHelper.accessor('payType', {
        id: 'Pay\nType',
        header: 'Pay\nType',
    }),
    columnHelper.accessor('clientName', {
        id: 'Client\nName',
        header: 'Client\nName',
    }),
    columnHelper.accessor('status', {
        id: 'Status',
        header: 'Status',
    }),
];
