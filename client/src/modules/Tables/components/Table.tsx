import {
    ColumnDef,
    PaginationState,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { getPrice } from '../../../utils/getPrice';
import { StateUpdater } from 'preact/hooks';
import styles from '../Table.module.css';

export function Table({
    setPagination,
    pagination,
    sorting,
    setSorting,
    columns,
    tableData,
    pagesCount,
    rowsCount,
    isShowToggle,
    caption,
}: {
    setPagination: StateUpdater<PaginationState>;
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
    sorting: SortingState;
    setSorting: StateUpdater<SortingState>;
    columns: ColumnDef<any, any>[];
    tableData: any[];
    pagesCount: number;
    rowsCount: number;
    isShowToggle: boolean;
    caption: string;
}) {
    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        pageCount: pagesCount ?? -1,
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        manualPagination: true,
    });

    return (
        <div>
            <div className={styles.tableContainer}>
                {isShowToggle && (
                    <div>
                        <div>
                            <label>
                                <input
                                    {...{
                                        type: 'checkbox',
                                        checked: table.getIsAllColumnsVisible(),
                                        onChange: table.getToggleAllColumnsVisibilityHandler(),
                                    }}
                                />
                                Toggle All
                            </label>
                        </div>
                        {table.getAllLeafColumns().map((column) => {
                            return (
                                <div key={column.id}>
                                    <label>
                                        <input
                                            {...{
                                                type: 'checkbox',
                                                checked: column.getIsVisible(),
                                                onChange: column.getToggleVisibilityHandler(),
                                            }}
                                        />
                                        {column.id}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div>
                    <table>
                        <caption>{caption}</caption>
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            {...{
                                                key: header.id,
                                                colSpan: header.colSpan,
                                            }}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? styles.sortColumn
                                                            : '',
                                                        onClick:
                                                            header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[header.column.getIsSorted() as string] ??
                                                        null}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.paginationContainer}>
                        <button
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<<'}
                        </button>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<'}
                        </button>
                        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            {'>'}
                        </button>
                        <button
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>>'}
                        </button>
                        <span>
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{' '}
                                {table.getPageCount()}
                            </strong>
                        </span>
                        <span>
                            | Go to page:
                            <input
                                type="number"
                                defaultValue={(
                                    table.getState().pagination.pageIndex + 1
                                ).toString()}
                                onChange={(e) => {
                                    const page = e.currentTarget.value
                                        ? Number(e.currentTarget.value) - 1
                                        : 0;
                                    table.setPageIndex(page);
                                }}
                            />
                        </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.currentTarget.value));
                            }}
                        >
                            {[10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>{rowsCount} Rows</div>
                </div>
            </div>
        </div>
    );
}
