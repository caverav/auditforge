import { t } from 'i18next';
import { useEffect, useState } from 'react';

import SelectDropdown from '../../../../../components/dropdown/SelectDropdown';
import UITable, { Column } from '../../../../../components/table/UITable';
import { useSortableTable } from '../../../../../hooks/useSortableTable';
import { useTableFiltering } from '../../../../../hooks/useTableFiltering';
import type { FindingByLocale } from '../../../../../services/audits';
import {
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

  const columns: Column[] = [
    {
      header: 'Title',
      accessor: 'title',
      sortable: true,
      filterable: true,
    },
    {
      header: 'Category',
      accessor: 'category',
      sortable: false,
      filterable: true,
    },
    {
      header: 'Type',
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
            category: item.category ?? 'No category',
            type: item.detail.vulnType ?? 'Undefined',
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
        <NewVulnButton />
      </div>

      <div className="mt-5">
        <UITable
          columns={columns}
          data={tableData}
          emptyState={t('noAudits')}
          filters={filters}
          keyExtractor={item => item._id}
          onFilter={handleFilterChange}
          onSort={handleSorting}
          sortable={true}
        />
      </div>
    </DivWrapper>
  );
};
