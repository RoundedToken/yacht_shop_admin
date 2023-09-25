import { useFetch } from '../../hooks/useFetch';
import { columnsOrders } from './components/columnsOrders';
import { IFilters, TClient, TOrdersResponse, TUpdateFilter } from '../../models';
import { Table } from './components/Table';
import { useParams } from '../../hooks/useParams';
import { StateUpdater, useEffect } from 'preact/hooks';
import { getPrice } from '../../utils/getPrice';

const OrdersTable = ({
    filters,
    setClients,
    isShowToggle,
}: {
    filters: IFilters;
    setClients: StateUpdater<TClient[] | undefined[]>;
    isShowToggle: boolean;
}) => {
    const { pagination, setPagination, sorting, setSorting, params } = useParams(filters);
    const { data } = useFetch<TOrdersResponse>(`get_sales`, params);

    useEffect(() => {
        if (data) {
            setClients(data.clients.filter((client) => client.id !== null));
        }
    }, [data]);

    return (
        <>
            {data && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Table
                        setPagination={setPagination}
                        pagination={pagination}
                        sorting={sorting}
                        setSorting={setSorting}
                        columns={columnsOrders}
                        tableData={data.orders}
                        pagesCount={data.pagesCount}
                        rowsCount={data.rowsCount}
                        isShowToggle={isShowToggle}
                        caption="Orders Table"
                    />
                    <div>Total Paid Sum: {getPrice(data.totalPaidSum)}</div>
                    <div>Total All Sum: {getPrice(data.totalAllSum)}</div>
                    <div>Total Products Sum: {getPrice(data.totalProductSum)}</div>
                </div>
            )}
        </>
    );
};

export default OrdersTable;
