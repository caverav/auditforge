import {
  ArrowDownTrayIcon,
  Bars3BottomRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SimpleInput from "../input/SimpleInput";

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

interface TableProps {
  columns: Column[];
  data: any[];
  keyExtractor: (item: any) => string | number;
  sortable?: boolean;
  onSort?: (column: string, direction: "asc" | "desc") => void;
  onFilter?: (value: string, accessor: string) => void;
  filters?: { [key: string]: string };
  rowSelection?: {
    selectedRowKeys: (string | number)[];
    onSelectRow: (selectedRowKeys: (string | number)[]) => void;
  };
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

  /**
   * Pagination
   */
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState(data);
  const [totalValuesPerPage, setTotalValuesPerPage] = useState(25);

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    if (currentPageNumber === Math.ceil(data.length / totalValuesPerPage))
      return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  /**
   * Update displayed data
   */
  useEffect(() => {
    if (totalValuesPerPage === 0) {
      setDataToDisplay(data);
    } else {
      const start = (currentPageNumber - 1) * totalValuesPerPage;
      const end = currentPageNumber * totalValuesPerPage;
      setDataToDisplay(data.slice(start, end));
    }
  }, [currentPageNumber, data, totalValuesPerPage]);

  return (
    <div className="overflow-x-auto bg-gray-900 p-2 shadow-2xl border rounded-lg">
      {children && (
        <div className="pb-4">
          <div className="py-3 mx-4">{children}</div>
          <hr className="h-1 mx-2 bg-gray-600 border-0 rounded" />
        </div>
      )}
      <div>
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  className="px-6 py-3 text-left tracking-wider"
                  key={column.accessor}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      {column.header}
                      {column.sortable && (
                        <div>
                          <button
                            className="ml-2 "
                            onClick={() =>
                              onSort && handleSortingChange(column.accessor)
                            }
                          >
                            <Bars3BottomRightIcon className="size-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    {column.filterable && onFilter && (
                      <SimpleInput
                        id={column.header}
                        name={column.header}
                        type="text"
                        placeholder={t("search")}
                        value={(filters && filters[column.accessor]) || ""}
                        onChange={(value) => {
                          onFilter(column.accessor, value);
                        }}
                      />
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
            {dataToDisplay.length === 0 && emptyState ? (
              <tr>
                <td className="px-6 py-4 text-center" colSpan={columns.length}>
                  {emptyState}
                </td>
              </tr>
            ) : (
              dataToDisplay.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-gray-800">
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {column.render
                        ? column.render(item[column.accessor])
                        : (item[column.accessor] ?? "-")}
                    </td>
                  ))}
                  {rowActions && (
                    <td
                      key={keyExtractor(item)}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {rowActions.map((action) => (
                        <button
                          key={action.label}
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
        {data.length > 0 && (
          <div className="flex">
            <div className="flex flex-wrap">
              <div className="mt-4 bg-gray-700 rounded-xl">
                <button onClick={goOnPrevPage}>
                  <ChevronLeftIcon className="size-4" />
                </button>
                <span className="text-gray-100 bg-gray-900 px-2 select-none rounded-xl">
                  {currentPageNumber} /{" "}
                  {totalValuesPerPage !== 0
                    ? Math.ceil(data.length / totalValuesPerPage)
                    : 1}
                </span>
                <button onClick={goOnNextPage}>
                  <ChevronRightIcon className="size-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 bg-gray-700 rounded-xl px-1">
              <select
                className="bg-gray-900 rounded-xl px-2"
                value={totalValuesPerPage}
                onChange={(e) => setTotalValuesPerPage(Number(e.target.value))}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={0}>{t("btn.all")}</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UITable;
