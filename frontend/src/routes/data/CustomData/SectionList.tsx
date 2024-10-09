import { Bars2Icon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

import PrimaryButton from '../../../components/button/PrimaryButton';
import SimpleInput from '../../../components/input/SimpleInput';
import DraggableList from '../../../components/table/DraggableTable';

type Section = {
  name: string;
  field: string;
  icon: string;
};

type SectionListProps = {
  data: Section[];
  isDisabled: boolean;
  onUpdateList: (data: Section[]) => void;
};

/**
 * Este componente renderea el contenido de EditCard
 */
const SectionList: React.FC<SectionListProps> = ({
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
    { _id: string; name: string; field: string; icon: string }[]
  >([]);

  const handleInputChange = (
    id: string,
    field: keyof Section,
    value: string | boolean,
  ) => {
    setRows(prevRows =>
      prevRows.map(row => (row._id === id ? { ...row, [field]: value } : row)),
    );
  };

  const handleRemoveRow = (id: string) => {
    setRows(prevRows => prevRows.filter(row => row._id !== id));
  };
  /**
   * Renderiza la fila del DnD
   *
   * Se debe manejar el disable de los Input en esta función.
   */

  const renderRow = (row: {
    id: string;
    name: string;
    field: string;
    icon: string;
  }) => (
    <div
      className={
        isDisabled
          ? 'grid grid-cols-1 md:grid-cols-4 place-items-center'
          : 'grid grid-cols-1 md:grid-cols-6 place-items-center'
      }
    >
      {!isDisabled ? (
        <div>
          <Bars2Icon className="size-4" />
        </div>
      ) : null}
      <div className="pr-2">
        <SimpleInput
          disabled={isDisabled}
          id="name"
          label={t('name')}
          name="name"
          onChange={value => handleInputChange(row.id, 'name', value)}
          placeholder={t('name')}
          type="text"
          value={row.name}
        />
      </div>
      <div className="pr-2">
        <SimpleInput
          disabled={isDisabled}
          id="field"
          label={t('field')}
          name="field"
          onChange={value => handleInputChange(row.id, 'field', value)}
          placeholder={t('field')}
          type="text"
          value={row.field}
        />
      </div>
      <div className="pr-2">
        <SimpleInput
          disabled={isDisabled}
          id="icon"
          label={t('icon')}
          name="icon"
          onChange={value => handleInputChange(row.id, 'icon', value)}
          placeholder={t('icon')}
          type="text"
          value={row.icon}
        />
      </div>
      {row.icon.startsWith('fa-') ? (
        <i className={`fa ${row.icon}`} />
      ) : (
        <i className="material-icons">{row.icon}</i>
      )}
      {!isDisabled ? (
        <div>
          <PrimaryButton color="red" onClick={() => handleRemoveRow(row.id)}>
            X
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );

  /**
   * Actualiza las rows al modificar data
   * (agregar una section en el componente padre)
   */
  useEffect(() => {
    if (rows.map(row => row._id).length !== data.length) {
      setRows(
        data.map((section, index) => ({ ...section, _id: index.toString() })),
      );
    }
  }, [data, rows]);

  /**
   * Le "avisa" al componente padre
   * que cambió la lista.
   */
  useEffect(() => {
    onUpdateList(rows.map(({ _id, ...rest }) => rest));
  }, [onUpdateList, rows]);

  /**
   * Se debe hacer map de las rows para agregarle ID.
   * Puede ser cualquier string ÚNICO dentro del objeto.
   */
  return (
    <div>
      <DraggableList
        isDisabled={isDisabled}
        items={rows.map(row => ({ ...row, id: row._id }))}
        onOrderChange={setRows}
        renderItem={renderRow}
      />
    </div>
  );
};

export default SectionList;
