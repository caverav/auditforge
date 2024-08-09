import { useState } from "react";
import { Column } from "../components/table/UITable";

export function useSortableTable<T>(data: T[], columns: Column[]) {
  const [tableData, setTableData] = useState(data);

  const accesors = columns.map((col) => col.accessor);

  const handleSorting = (column: string, direction: "asc" | "desc") => {
    if (column && accesors.includes(column)) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[column as keyof T] === null) return 1;
        if (b[column as keyof T] === null) return -1;
        if (a[column as keyof T] === null && b[column as keyof T] === null)
          return 0;
        return (
          a[column as keyof T]!.toString().localeCompare(
            b[column as keyof T]!.toString(),
            "en",
            {
              numeric: true,
            }
          ) * (direction === "asc" ? 1 : -1)
        );
      });

      setTableData(sorted);
    }
  };

  return [tableData, handleSorting] as const;
}
