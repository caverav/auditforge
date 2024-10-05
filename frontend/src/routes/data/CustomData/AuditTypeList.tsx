import { useEffect, useState } from 'react';

import DraggableList from '../../../components/table/DraggableTable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import { AuditType } from '../../../services/data';

type AuditTypeListProps = {
  auditTypes: AuditType[];
  isDisabled: boolean;
  onUpdateList: (data: AuditType[]) => void;
};

export const AuditTypeList: React.FC<AuditTypeListProps> = ({
  auditTypes,
  isDisabled,
  onUpdateList,
}) => {
  const [rows, setRows] = useState<
    {
      _id: string;
      name: string;
      hidden: string[];
      sections: string[];
      stage: string;
      templates: { template: string; locale: string }[];
      id: string;
    }[]
  >(auditTypes.map((row, index) => ({ ...row, id: index.toString() })));

  const handleInputChange = (
    _id: string,
    field: keyof AuditType,
    value: string | boolean,
  ) => {
    setRows(prevRows =>
      prevRows.map(row => (row._id === _id ? { ...row, [field]: value } : row)),
    );
  };

  const handleRemoveRow = (_id: string) => {
    setRows(rows.filter(row => row._id !== _id));
  };

  const renderRow = (row: AuditType) => (
    <div className="p-2">
      <Accordion collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>{row.name}</AccordionTrigger>
          <AccordionContent>{row.stage}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  /**
   * Le "avisa" al componente padre
   * que cambió la lista.
   */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdateList(rows.map(({ id, ...rest }) => rest));
  }, [onUpdateList, rows]);

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
