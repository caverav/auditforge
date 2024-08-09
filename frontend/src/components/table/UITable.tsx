import {
  ArrowDownTrayIcon,
  Bars3BottomRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

export type Column = {
  header: string;
  accessor: string;
  sortable?: boolean;
  render?: (data: any) => JSX.Element;
};

type RowAction = {
  label: string;
  onClick: (item: any) => void;
};

interface TableProps {
  columns: Column[];
  data: any[];
  keyExtractor: (item: any) => string | number;
  sortable?: boolean;
  onSort?: (column: string, direction: "asc" | "desc") => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  filterable?: boolean;
  onFilter?: (filters: { [key: string]: any }) => void;
  rowSelection?: {
    selectedRowKeys: (string | number)[];
    onSelectRow: (selectedRowKeys: (string | number)[]) => void;
  };
  customStyles?: React.CSSProperties;
  rowActions?: RowAction[];
  emptyState?: React.ReactNode;
  children?: React.ReactNode;
}

const mapActionLabelToIcon = (label: string) => {
  switch (label) {
    case "Edit":
      return <PencilSquareIcon className="size-6" />;
    case "Delete":
      return <TrashIcon className="size-6" />;
    case "Download":
      return <ArrowDownTrayIcon className="size-6" />;
    default:
      return label;
  }
};

const UITable: React.FC<TableProps> = ({
  columns,
  data,
  keyExtractor,
  onSort,
  pagination,
  rowActions,
  emptyState,
  children,
}) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const handleSortingChange = (accessor: string) => {
    if (onSort) {
      const sortOrder =
        accessor === sortField && order === "asc" ? "desc" : "asc";
      setSortField(accessor);
      setOrder(sortOrder);
      onSort(accessor, sortOrder);
    }
  };
  return (
    <div className="overflow-x-auto bg-gray-700 p-2 shadow-2xl border rounded-lg">
      <div className="py-3 mx-4">{children}</div>
      <hr className="h-1 mx-2 bg-gray-600 border-0 rounded" />
      <div>
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-700">
            <tr>
              {columns.map((column, index) => (
                <th className="px-6 py-3 text-left tracking-wider" key={index}>
                  <div className="flex justify-between">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <button
                        className="ml-2"
                        onClick={() =>
                          onSort && handleSortingChange(column.accessor)
                        }
                      >
                        <Bars3BottomRightIcon className="size-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {rowActions && (
                <th
                  className="px-6 py-3 text-left tracking-wider"
                  key="actions"
                />
              )}
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {data.length === 0 && emptyState ? (
              <tr>
                <td className="px-6 py-4 text-center" colSpan={columns.length}>
                  {emptyState}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-gray-800">
                  {columns.map((column, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      {column.render
                        ? column.render(item[column.accessor])
                        : item[column.accessor]}
                    </td>
                  ))}
                  {rowActions && (
                    <td
                      key={keyExtractor(item)}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {rowActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => action.onClick(item)}
                          className="text-indigo-300 hover:text-indigo-600"
                        >
                          {mapActionLabelToIcon(action.label)}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {pagination && (
          <div className="flex flex-wrap">
            <div className="mt-4 bg-gray-800 rounded-xl">
              <button
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage - 1)
                }
              >
                <ChevronLeftIcon className="size-4" />
              </button>
              <span className="text-gray-100 bg-gray-900 px-2 select-none rounded-xl">
                {pagination.currentPage} / {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage + 1)
                }
              >
                <ChevronRightIcon className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UITable;
