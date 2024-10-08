import { useState } from 'react';

import { Column } from '../components/table/UITable';
/**
 * Hook creado para manejar de manera simple el sorting de la tabla.
 *
 * Se deben ingresar los datos de la tabla y las columnas, definidas previamente.
 *
 * Se debe utilizar el tipo T definido en el componente que llama al hook, que defina
 * las columnas de los datos. **EJEMPLO**:
 * 
 * ```
 * type TableData = {
    id: number;
    name: string;
    age: number;
    country: string;
    profile: string;
  };
 * 
 * ```
 * 
 * Luego, se llama al hook:
 * 
 * `const [sortedData,setTableData] = useSortableTable<TableData>(data, columns);`
 *
 * @param data Datos de la tabla.
 * @param columns Columnas de la tabla. Utiliza el type `Column`.
 * @returns Hook para mostrar los datos de la tabla y func. `setTableData` para UITable.
 */
export const useSortableTable = <T,>(data: T[], columns: Column[]) => {
  const [tableData, setTableData] = useState(data);

  const accesors = columns.map(col => col.accessor);

  const handleSorting = (column: string, direction: 'asc' | 'desc') => {
    if (column && accesors.includes(column)) {
      const sorted = [...tableData].sort((a, b) => {
        const aValue = a[column as keyof T];
        const bValue = b[column as keyof T];

        const aString =
          aValue !== null && aValue !== undefined ? String(aValue) : '';
        const bString =
          bValue !== null && bValue !== undefined ? String(bValue) : '';

        return (
          aString.localeCompare(bString, 'en', {
            numeric: true,
          }) * (direction === 'asc' ? 1 : -1)
        );
      });

      setTableData(sorted);
    }
  };

  return [tableData, handleSorting, setTableData] as const;
};
