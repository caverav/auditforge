import { useEffect, useState } from "react";
import { t } from "i18next";
import SelectDropdown from "../../../../../components/dropdown/SelectDropdown";
import UITable, { Column } from "../../../../../components/table/UITable";
import { useSortableTable } from "../../../../../hooks/useSortableTable";
import { useTableFiltering } from "../../../../../hooks/useTableFiltering";
import PrimaryButton from "../../../../../components/button/PrimaryButton";
import {TmpVulnFindings, exampleFindings, getVulnColumns} from "../dummy_data"
import { getLanguages } from "../../../../../services/audits";

interface ListItem {
  id: number;
  value: string;
  label?: string;
}

type LanguagesData = {
  language: string;
  locale: string;
};

export const Add = () => {

  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<any>(null);
  const [loadingLanguages, setLoadingLanguages] = useState<boolean>(true);

  const [columns, setColumns] = useState<Column[]>([]);

  const [filteredData, setFilteredData] = useState<TmpVulnFindings[]>([]);

  const [tableData, handleSorting, setTableData] = useSortableTable<TmpVulnFindings>(
    filteredData,
    columns,
  );

  const [filters, handleFilterChange] = useTableFiltering<TmpVulnFindings>(
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
          })
        );
        setLanguages(languagesName);
        setLoadingLanguages(false);

        const dataColumns = getVulnColumns();
        setColumns(dataColumns);

        const filteredFindings = exampleFindings.filter(
          (finding) => finding.language === currentLanguage.label
        );

        console.log(currentLanguage.label); 

        setTableData(filteredFindings);
        setFilteredData(filteredFindings);

      } catch (err) {
        setLoadingLanguages(false);
      }
    };
    fetchData();
  }, [currentLanguage]);

  return (
    <div className="min-h-screen bg-gray-800 pt-16">
      <div className="bg-gray-800 flex justify-center items-center">
        <div className="w-full max-w-4xl bg-gray-900 shadow-lg rounded-lg p-8 mt-6">

          <div className="flex justify-between">
              <div className=" w-1/2">
                {!loadingLanguages && (
                  <SelectDropdown
                    title={t("language")}
                    items={languages}
                    selected={currentLanguage}
                    onChange={setCurrentLanguage}
                  />
                )}
              </div>

              <div className="">
                <PrimaryButton
                  onClick={() => {}}
                >
                  {t("newVulnerability")}
                </PrimaryButton>
              </div>
            </div>

            <div className="mt-5">
              <UITable
                columns={columns}
                data={tableData}
                keyExtractor={(item) => item._id}
                sortable={true}
                onSort={handleSorting}
                emptyState={t("noAudits")}
                filters={filters}
                onFilter={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>
  );
};
