import { Bars2Icon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

import PrimaryButton from '../../../components/button/PrimaryButton';
import SimpleInput from '../../../components/input/SimpleInput';
import DraggableList from '../../../components/table/DraggableTable';

type LanguageItem = {
  language: string;
  locale: string;
};

type LanguageListProps = {
  data: LanguageItem[];
  isDisabled: boolean;
  onUpdateList: (data: LanguageItem[]) => void;
};

/**
 * Este componente renderea el contenido de EditCard
 */
const LanguageList: React.FC<LanguageListProps> = ({
  data,
  isDisabled,
  onUpdateList,
}) => {
  /**
   * Estado parcial de las filas
   * Al mover o modificar el contenido de una, se actualiza acá
   * Se debe hacer PUT al backend si se desea guardar los cambios
   *
   * También se debe agregar un atributo id único a cada fila si es que no se posee.
   */
  const [rows, setRows] = useState<
    { language: string; locale: string; id: string }[]
  >(data.map((row, index) => ({ ...row, id: index.toString() })));

  /**
   * Renderiza la fila del DnD
   *
   * Se debe manejar el disable de los Input en esta función.
   */
  const renderRow = (row: LanguageItem) => (
    <div
      className={`grid grid-cols-1 md:grid-cols-${isDisabled ? '2' : '4'} place-items-center`}
    >
      {!isDisabled ? (
        <div>
          <Bars2Icon className="size-4" />
        </div>
      ) : null}
      <div className="pr-2">
        <SimpleInput
          disabled={isDisabled}
          id="language"
          name="language"
          onChange={e => handleInputChange(row.language, 'language', e)}
          placeholder="language"
          type="text"
          value={row.language}
        />
      </div>
      <div className="pr-2">
        <SimpleInput
          disabled={isDisabled}
          id="locale"
          name="locale"
          onChange={e => handleInputChange(row.locale, 'locale', e)}
          placeholder="locale"
          type="text"
          value={row.locale}
        />
      </div>
      {!isDisabled ? (
        <div>
          <PrimaryButton
            color="red"
            onClick={() => handleRemoveRow(row.language)}
          >
            X
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );

  const handleInputChange = (
    id: string,
    field: keyof LanguageItem,
    value: string | boolean,
  ) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.language === id ? { ...row, [field]: value } : row,
      ),
    );
  };

  const handleRemoveRow = (id: string) => {
    setRows(rows.filter(row => row.language !== id));
  };

  /**
   * Le "avisa" al componente padre
   * que cambió la lista.
   */
  useEffect(() => {
    if (rows !== data) {
      /**
       * Le quito el "id" y envío solamente el resto al componente padre
       */
      onUpdateList(rows.map(({ id, ...rest }) => rest));
    }
  }, [rows]);

  /**
   * Se debe hacer map de las rows para agregarle ID.
   * Puede ser cualquier string ÚNICO dentro del objeto.
   */
  return (
    <div>
      <DraggableList
        isDisabled={isDisabled}
        items={rows}
        onOrderChange={setRows}
        renderItem={renderRow}
      />
    </div>
  );
};

export default LanguageList;
