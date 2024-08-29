import { useEffect, useState } from 'react';
import { Column } from '../components/table/UITable';

/**
 *
 * @param fullData Datos completos sin filtrar.
 * @param columns Columnas de la tabla.
 * @param setTableData Función que actualiza los datos de la tabla. Puede ser la misma entregada por useSortableTable.
 * @returns filters: state de los filtros aplicados. handleFilterChange: función que actualiza el estado de los filtros; puede ser pasada a la UITable o a un filtro personalizado.
 */
export const useTableFiltering = <T>(
  fullData: any[],
  columns: Column[],
  setTableData: (data: any[]) => void,
) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (accessor: string, value: string) => {
    const newFilters = { ...filters, [accessor]: value };
    setFilters(newFilters);
  };

  useEffect(() => {
    const newFilteredData = fullData?.filter(item =>
      columns.every(column => {
        const filterValue = filters[column.accessor];
        if (!filterValue) {
          return true;
        }
        return String(item[column.accessor as keyof T])
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }),
    );
    setTableData(newFilteredData ?? []);
  }, [filters]);

  return [filters, handleFilterChange] as const;
};
