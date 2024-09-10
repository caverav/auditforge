import {
  ArrowDownTrayIcon,
  Bars3BottomRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FingerPrintIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SimpleInput from '../input/SimpleInput';

export type Column = {
  header: string;
  accessor: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (data: any) => JSX.Element;
};

type RowAction = {
  label: string;
  onClick: (item: any) => void;
};

type TableProps = {
  columns: Column[];
  data: any[];
  keyExtractor: (item: any) => string | number;
  sortable?: boolean;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (value: string, accessor: string) => void;
  filters?: Record<string, string>;
  rowSelection?: {
    selectedRowKeys: (string | number)[];
    onSelectRow: (selectedRowKeys: (string | number)[]) => void;
  };
  rowActions?: RowAction[];
  emptyState?: React.ReactNode;
  children?: React.ReactNode;
};

const mapActionLabelToIcon = (label: string) => {
  switch (label) {
    case 'Add':
      return <PlusCircleIcon className="size-6" />;

    case 'Edit':
      return <PencilSquareIcon className="size-6" />;

    case 'Delete':
      return <TrashIcon className="size-6" />;

    case 'Download':
      return <ArrowDownTrayIcon className="size-6" />;

    case 'FindAudit':
      return <FingerPrintIcon className="size-6" />;

    default:
      return label;
  }
};

const UITable: React.FC<TableProps> = ({
  columns,
  data,
  keyExtractor,
  onSort,
  onFilter,
  filters,
  rowActions,
  emptyState,
  children,
}) => {
  const { t } = useTranslation();

  /**
   * Sorting
   */
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const handleSortingChange = (accessor: string) => {
    if (onSort) {
      const sortOrder =
        accessor === sortField && order === 'asc' ? 'desc' : 'asc';
      setSortField(accessor);
      setOrder(sortOrder);
      onSort(accessor, sortOrder);
    }
  };

  /**
   * Pagination
   */
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState(data);
  const [totalValuesPerPage, setTotalValuesPerPage] = useState(25);

  const goOnPrevPage = () => {
    if (currentPageNumber === 1 || totalValuesPerPage === 0) {
      return;
    }
    setCurrentPageNumber(prev => prev - 1);
  };
  const goOnNextPage = () => {
    if (
      currentPageNumber === Math.ceil(data.length / totalValuesPerPage) ||
      totalValuesPerPage === 0
    ) {
      return;
    }
    setCurrentPageNumber(prev => prev + 1);
  };

  /**
   * Update displayed data
   */
  useEffect(() => {
    if (totalValuesPerPage === 0) {
      setDataToDisplay(data);
      setCurrentPageNumber(1);
    } else {
      const start = (currentPageNumber - 1) * totalValuesPerPage;
      const end = currentPageNumber * totalValuesPerPage;
      setDataToDisplay(data.slice(start, end));
    }
  }, [currentPageNumber, data, totalValuesPerPage]);

  return (
    <div className="overflow-x-auto bg-gray-900 p-2 shadow-2xl border rounded-lg">
      {children ? (
        <div className="pb-4">
          <div className="py-3 mx-4">{children}</div>
          <hr className="h-1 mx-2 bg-gray-600 border-0 rounded" />
        </div>
      ) : null}
      <div>
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-700">
            <tr>
              {columns.map(column => (
                <th
                  className="px-6 py-3 text-left tracking-wider"
                  key={column.accessor}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      {column.header}
                      {column.sortable ? (
                        <div>
                          <button
                            className="ml-2 "
                            onClick={() =>
                              onSort && handleSortingChange(column.accessor)
                            }
                            type="button"
                          >
                            <Bars3BottomRightIcon className="size-4" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                    {column.filterable && onFilter ? (
                      <SimpleInput
                        id={column.header}
                        name={column.header}
                        onChange={value => {
                          onFilter(column.accessor, value);
                        }}
                        placeholder={t('search')}
                        type="text"
                        value={(filters && filters[column.accessor]) ?? ''}
                      />
                    ) : null}
                  </div>
                </th>
              ))}
              {rowActions ? (
                <th
                  className="px-6 py-3 text-left tracking-wider"
                  key="actions"
                />
              ) : null}
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {dataToDisplay.length === 0 && emptyState ? (
              <tr>
                <td className="px-6 py-4 text-center" colSpan={columns.length}>
                  {emptyState}
                </td>
              </tr>
            ) : (
              dataToDisplay.map(item => (
                <tr className="hover:bg-gray-800" key={keyExtractor(item)}>
                  {columns.map(column => (
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      key={column.accessor}
                    >
                      {column.render
                        ? column.render(item[column.accessor])
                        : item[column.accessor] ?? '-'}
                    </td>
                  ))}
                  {rowActions ? (
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      key={keyExtractor(item)}
                    >
                      {rowActions.map(action => (
                        <button
                          className="text-indigo-300 hover:text-indigo-600"
                          key={action.label}
                          onClick={() => action.onClick(item)}
                          type="button"
                        >
                          {mapActionLabelToIcon(action.label)}
                        </button>
                      ))}
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {data.length > 0 ? (
          <div className="flex">
            <div className="flex flex-wrap">
              <div className="mt-4 bg-gray-700 rounded-xl">
                <button onClick={goOnPrevPage} type="button">
                  <ChevronLeftIcon className="size-4" />
                </button>
                <span className="text-gray-100 bg-gray-900 px-2 select-none rounded-xl">
                  {currentPageNumber} /{' '}
                  {totalValuesPerPage !== 0
                    ? Math.ceil(data.length / totalValuesPerPage)
                    : 1}
                </span>
                <button onClick={goOnNextPage} type="button">
                  <ChevronRightIcon className="size-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 bg-gray-700 rounded-xl px-1">
              <select
                className="bg-gray-900 rounded-xl px-2"
                onChange={e => setTotalValuesPerPage(Number(e.target.value))}
                value={totalValuesPerPage}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={0}>{t('btn.all')}</option>
              </select>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UITable;
