import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import { COLUMNS } from './VehicleTableColumns';
import { ColumnFilter } from './ColumnFilter';
import styles from './VehicleStyles.css';

function VehicleTable(props) {
    const columns = useMemo(() => COLUMNS, []);
    // eslint-disable-next-line
    const data = useMemo(() => props.dtos, []);
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, []);

    const tableInstance = useTable({
        columns, data, defaultColumn
    },
        useFilters,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        prepareRow,
        setPageSize,
    } = tableInstance;

    const { pageIndex, pageSize } = state;
    return (
        <>
            <div style={{ "padding-left": "27rem", "paddingTop": "2rem" }}>
                <span>Page
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <span> | Go to:
                    <input
                        typr="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(pageNumber);
                        }}
                    />
                </span>
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    {[10, 20].map((pageSize) => {
                        return (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        )
                    })}
                </select>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    Previous
                </button>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    Next
                </button>

            </div>
            <table {...getTableProps()} className={styles.customers}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th>
                                    <div
                                        {
                                        ...column.getHeaderProps([
                                            {
                                                className: column.headerClassName
                                            },
                                            column.getSortByToggleProps()
                                        ])
                                        }
                                    >
                                        {column.render('Header')}
                                    </div>
                                    <div>
                                        {column.canFilter ? column.render('Filter') : null}
                                    </div>
                                </th>
                            ))}

                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps([
                                            {
                                                className: cell.column.className
                                            }
                                        ])}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </>
    )
}
export default VehicleTable;