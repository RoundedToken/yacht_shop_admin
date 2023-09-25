import { useFetch } from '../../hooks/useFetch';
import { IFilters, TProductsResponse, TUpdateFilter } from '../../models';
import { columnsProducts } from './components/columnsProducts';
import { Table } from './components/Table';
import { useParams } from '../../hooks/useParams';

const ProductsTable = ({
    filters,
    updateFilter,
    isShowToggle,
}: {
    filters: IFilters;
    updateFilter: TUpdateFilter;
    isShowToggle: boolean;
}) => {
    const { params, setPagination, setSorting, sorting, pagination } = useParams(filters);
    const { data } = useFetch<TProductsResponse>(`get_products`, params);

    return (
        <>
            {data && (
                <Table
                    setPagination={setPagination}
                    pagination={pagination}
                    sorting={sorting}
                    setSorting={setSorting}
                    columns={columnsProducts(updateFilter, filters)}
                    tableData={data.products}
                    pagesCount={data.pagesCount}
                    rowsCount={data.rowsCount}
                    isShowToggle={isShowToggle}
                    caption="Products Table"
                />
            )}
        </>
    );
};

export default ProductsTable;
