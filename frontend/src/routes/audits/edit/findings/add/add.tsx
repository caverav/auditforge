import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import SimpleInput from '@/components/input/SimpleInput';

import SelectDropdown from '../../../../../components/dropdown/SelectDropdown';
import UITable, { Column } from '../../../../../components/table/UITable';
import { useSortableTable } from '../../../../../hooks/useSortableTable';
import { useTableFiltering } from '../../../../../hooks/useTableFiltering';
import type { FindingByLocale } from '../../../../../services/audits';
import {
  addFinding,
  addVuln,
  getLanguages,
  getVulnByLanguage,
} from '../../../../../services/audits';
import DivWrapper from './DivWrapper';
import NewVulnButton from './NewVulnButton';

type ListItem = {
  id: number;
  value: string;
  label?: string;
};

type LanguagesData = {
  language: string;
  locale: string;
};

type TableData = {
  id: string;
  title: string;
  category: string;
  type: string;
};

export const Add = () => {
  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem | null>(null);
  const [loadingLanguages, setLoadingLanguages] = useState<boolean>(true);
  const [newVulnTitle, setNewVulnTitle] = useState<string>('');
  const { auditId } = useParams();

  const columns: Column[] = [
    {
      header: t('title'),
      accessor: 'title',
      sortable: true,
      filterable: true,
    },
    {
      header: t('category'),
      accessor: 'category',
      sortable: false,
      filterable: true,
    },
    {
      header: t('type'),
      accessor: 'type',
      sortable: false,
      filterable: true,
    },
  ];

  const [filteredData, setFilteredData] = useState<TableData[]>([]);

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    filteredData,
    columns,
  );

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    filteredData,
    columns,
    setTableData,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataLanguage = await getLanguages();
        const languagesName = dataLanguage.datas.map(
          (item: LanguagesData, index: number) => ({
            id: index,
            value: item.locale,
            label: item.language,
          }),
        );
        setLanguages(languagesName);
        setLoadingLanguages(false);

        const vulns = await getVulnByLanguage(
          currentLanguage ? currentLanguage.value : 'en',
        );

        const vulnsName = vulns.datas.map(
          (item: FindingByLocale): TableData => ({
            id: item._id,
            title: item.detail.title,
            category: item.category ?? t('noCategory'),
            type: item.detail.vulnType ?? t('undefined'),
          }),
        );

        setTableData(vulnsName);
        setFilteredData(vulnsName);
      } catch (err) {
        setLoadingLanguages(false);
      }
    };
    fetchData().catch(console.error);
  }, [currentLanguage, setTableData]);

  const handleAddVuln = useCallback(
    (item: TableData) => {
      addVuln(item.id, auditId ?? '')
        .then(res => {
          if (res.status === 'success') {
            setNewVulnTitle('');
            toast.success(t('msg.findingCreateOk'));
          } else {
            toast.error(t(res.datas));
          }
        })
        .catch(console.error);
    },
    [auditId],
  );

  const rowActions = [
    {
      label: 'Add',
      onClick: handleAddVuln,
    },
  ];

  const handleAddFinding = useCallback(() => {
    addFinding(newVulnTitle, auditId ?? '')
      .then(res => {
        if (res.status === 'success') {
          setNewVulnTitle('');
          toast.success(t('msg.findingCreateOk'));
        } else {
          toast.error(t(res.datas));
        }
      })
      .catch(console.error);
  }, [newVulnTitle, auditId]);

  return (
    <DivWrapper>
      <div className="flex justify-between">
        <div className=" w-1/2">
          {!loadingLanguages ? (
            <SelectDropdown
              items={languages}
              onChange={setCurrentLanguage}
              selected={currentLanguage}
              title={t('language')}
            />
          ) : null}
        </div>
        <div className="w-1/4">
          <SimpleInput
            id="title"
            label={t('title')}
            name="title"
            onChange={setNewVulnTitle}
            placeholder={t('title')}
            type="text"
            value={newVulnTitle}
          />
          <div className="my-2" />
          <NewVulnButton onClick={handleAddFinding} />
        </div>
      </div>

      <div className="mt-5">
        <UITable
          columns={columns}
          data={tableData}
          emptyState={t('err.noMatchingRecords')}
          filters={filters}
          keyExtractor={item => item._id}
          onFilter={handleFilterChange}
          onSort={handleSorting}
          rowActions={rowActions}
          sortable={true}
        />
      </div>
    </DivWrapper>
  );
};
